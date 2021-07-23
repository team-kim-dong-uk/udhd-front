import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GooglePicker from './GooglePicker';
import { appendCandidates, setGoogleDriveToken } from '../../core/redux/upload';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';
import TagPlane from '../TagPlane';
import GalleryPicker from './GalleryPicker';
import * as uploadAPI from '../../api/upload';

export default function Upload({ children, ...props }) {
  const dispatch = useDispatch();
  const upload = useSelector(state => state.upload);

  const onAuthenticate = (token) => {
    dispatch(setGoogleDriveToken(token));
  }

  const onChange = async (e) => {
    if (e.action !== 'picked') {
      return;
    }
    // only when pictures are selected.
    // todo: handle when folder selected.
    console.log(e);
    const payload = e.docs.map(doc => ({
      id: doc.id,
      mimeType: doc.mimeType
    }));
    dispatch(appendCandidates(payload));
    // const requests = e.docs.map(doc => axios.get(`https://www.googleapis.com/drive/v3/files/${doc.id}?alt=media`, {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    //   responseType: 'blob'
    // }));
    // const responses = await axios.all(requests);

    // const payload = e.docs.map(doc => ({id: doc.id}));
    // for (let i = 0; i < responses.length; i++) {
    //   payload[i].url = URL.createObjectURL(responses[i].data);
    // }

    // axios.put('https://udhdbucket.s3.ap-northeast-2.amazonaws.com/123?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210723T071039Z&X-Amz-SignedHeaders=host&X-Amz-Expires=119&X-Amz-Credential=AKIAU2ZARE36SVTBAB3X%2F20210723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=d1ee71929d47c6be3b26d83eadc1da59fcb54bff123df5fb6893f89d230ffa4e'
    // , responses[0].data);

  }

  const onUpload = async () => {
    console.log('hi');
    const checksums = upload.data.map(data => data.id); // TODO: calculate md5 checksum

    const response = await uploadAPI.getPresignedURLs(checksums);
    const presignedURLs = response.data;
    console.log(presignedURLs);
    for (let i = 0; i < upload.data.length; i++) {
      if (!presignedURLs[i]) {
        continue;
      }
      const blobResponse = await axios.get(`https://www.googleapis.com/drive/v3/files/${upload.data[i].id}?alt=media`, {
        headers: {
          'Authorization': `Bearer ${upload.googleDriveToken}`
        },
        responseType: 'blob'
      });
      const res = await axios.put(presignedURLs[i], blobResponse.data, {
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
        upload.data.map(cand => 
          <S.Thumbnail key={cand.id}>
            <S.Image src={cand.url} thumbnail={true}/>
          </S.Thumbnail>)
      }
      </S.UploadCandidates>
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