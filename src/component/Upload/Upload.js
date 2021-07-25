import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GooglePicker from './GooglePicker';
import { appendCandidates, setGoogleDriveToken, showMoreItems } from '../../core/redux/upload';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';
import TagPlane from '../TagPlane';
import GalleryPicker from './GalleryPicker';
import * as uploadAPI from '../../api/upload';
import CryptoJS from 'crypto-js';
import { useInView } from 'react-intersection-observer';

export default function Upload({ children, ...props }) {
  const dispatch = useDispatch();
  const upload = useSelector(state => state.upload);

  const {ref, inView} = useInView();
  useEffect(async () => {
    if (inView && upload.data) {
      const nextNumShowItems = Math.min(upload.data.length, upload.numShowItems + 9);
      const newData = upload.data.slice(upload.numShowItems, nextNumShowItems)
                                  .map(({id, mimeType}) => ({id, mimeType}));
      // 이전에 데이터 요청한 적이 있어 이미 데이터 있는 사진들은 제외하고 데이터 요청
      const requests = newData.map((data, index) => data.blob ?
        null :
        { index,
          request: axios.get(`https://www.googleapis.com/drive/v3/files/${data.id}?alt=media`, {
            headers: {
              'Authorization': `Bearer ${upload.googleDriveToken}`
            },
            responseType: 'blob'
          })
        }
      ).filter(data => data !== null);
      
      const responses = await axios.all(requests.map(({request}) => request));
      let i = 0;
      for (let j =0; j < requests.length; j++) {
        if (requests[j]) {
          const index = requests[j].index;
          newData[index].blob = responses[i].data;
          newData[index].url = URL.createObjectURL(newData[index].blob);
          i++;
        }
      }

      dispatch(showMoreItems({
        newData,
        nextNumShowItems,
      }));
    }
  }, [inView, dispatch])

  const onAuthenticate = (token) => {
    dispatch(setGoogleDriveToken(token));
  }

  const onChange = async (e) => {
    if (e.action !== 'picked') {
      return;
    }
    // only when pictures are selected.
    // todo: handle when folder selected.
    const payload = e.docs.map(doc => ({
      id: doc.id,
      mimeType: doc.mimeType
    }));
    dispatch(appendCandidates(payload));
  }

  const onUpload = async () => {
    const data = [];
    const checksums = [];
    // checksum 계산하기
    // 이전에 화면출력을 위해 로드한 적 있는 사진들은 checksum 바로 계산
    for (let i = 0; i < upload.data.length; i++) {
      if (upload.data[i].blob) {
        data[i] = upload.data[i].blob;
        checksums[i] = CryptoJS.MD5(data[i]).toString();
      }
    }
    // 나머지 사진들은 axios.all 로 한번에 데이터 요청후 checksum 계산
    const requests = upload.data.map((data, index) => data.blob ?
      null :
      { index,
        request: axios.get(`https://www.googleapis.com/drive/v3/files/${data.id}?alt=media`, {
          headers: {
            'Authorization': `Bearer ${upload.googleDriveToken}`
          },
          responseType: 'blob'
        })
      }
    ).filter(data => data !== null);
      
    const responses = await axios.all(requests.map(({request}) => request));
    let i = 0;
    for (let j =0; j < requests.length; j++) {
      if (requests[j]) {
        const index = requests[j].index;
        data[index] = responses[i].data;
        checksums[index] = CryptoJS.MD5(data[index]).toString();
        i++;
      }
    }

    // presigned url 불러오기
    const response = await uploadAPI.getPresignedURLs(checksums);
    const presignedURLs = response.data;
    
    // s3에 저장요청하기
    for (let i = 0; i < upload.data.length; i++) {
      // 이미 누군가 업로드한 사진은 다시 업로드 하지 않음.
      if (!presignedURLs[i]) {
        continue;
      }
      const res = await axios.put(presignedURLs[i], data[i], {
        headers: {
          'Content-Type': upload.data[i].mimeType
        }
      });
    }
    alert('50% 업로드 완료');
  }

  return (
    <S.Upload>
      <GooglePicker
        clientId={process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID}
        developerKey={process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}
        scope={['https://www.googleapis.com/auth/drive.readonly']}
        onChange={onChange}
        onAuthenticate={onAuthenticate}
        onAuthFailed={data => console.log('on auth failed:', data)}
        mimeTypes={['application/vnd.google-apps.folder', 'image/png', 'image/jpg', 'image/jpeg']}
        query={''}>
      </GooglePicker>
      <GalleryPicker></GalleryPicker>
      <S.UploadCandidates>
      {
        upload.data.slice(0, upload.numShowItems).map(cand => 
          <S.Thumbnail key={cand.id}>
            <S.Image src={cand.url} thumbnail={true}/>
          </S.Thumbnail>)
      }
      </S.UploadCandidates>
      {
        !upload.data.length 
        || upload.data.length === upload.numShowItems
        || <div ref={ref}>로딩중...</div>
      }
      <TagPlane />
      <S.UploadButton disabled={upload.data.length === 0} onClick={onUpload}>업로드하기</S.UploadButton>
    </S.Upload>
  );
}

Upload.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};

S.Upload = styled.div`
`;

S.UploadCandidates = styled.div`
`;


S.UploadButton = styled(Button)`
  width: 100%;
  position: fixed;
  bottom: 80px;
`;

S.Thumbnail = styled.div`
  border: 1px solid;
  position: relative;
  width: 33%;
  overflow: hidden;
  display: inline-block;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

S.Image = styled(Image)`
  position:  absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  object-position: center;
`;