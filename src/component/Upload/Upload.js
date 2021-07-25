import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GooglePicker from './GooglePicker';
import { appendCandidates, fetchMoreItems, setGoogleDriveToken, showMoreItems, uploadPhotos } from '../../core/redux/upload';
import { Button, Image } from 'react-bootstrap';
import TagPlane from '../TagPlane';
import GalleryPicker from './GalleryPicker';
import { useInView } from 'react-intersection-observer';

const FETCH_SIZE = 9;

export default function Upload({ children, ...props }) {
  const dispatch = useDispatch();
  const { upload, loading } = useSelector(state => state);

  const {ref, inView} = useInView();
  useEffect(() => {
    // 무한스크롤용. 스크롤을 끝까지 내리면 다음 데이터를 fetch해온다.
    if (inView && upload.data.length > 0 && !loading.data) {
      const fetchUntil = Math.min(upload.data.length, upload.numShowItems + FETCH_SIZE);
      const newData = upload.data.slice(upload.numShowItems, fetchUntil);
      dispatch(fetchMoreItems({
        newData,
        fetchUntil,
        googleDriveToken: upload.googleDriveToken,
      }));
    }
  }, [inView, dispatch, loading, upload])

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
    if (!loading.data) {
      dispatch(uploadPhotos(upload));
    }
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
        query={''}
        buttonDisabled={loading.data}>
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
      <S.UploadButton disabled={upload.data.length === 0 || loading.data} onClick={onUpload}>업로드하기</S.UploadButton>
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