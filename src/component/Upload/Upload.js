import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import GooglePicker from './GooglePicker';
import { appendCandidates } from '../../core/redux/upload';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import TagPlane from '../TagPlane';
import GalleryPicker from './GalleryPicker';

export default function Upload({ children, ...props }) {
  const dispatch = useDispatch();
  const upload = useSelector(state => state.upload);

  const onChange = async (e) => {
    if (e.action !== 'picked') {
      return;
    }
    // only when pictures are selected.
    // todo: handle when folder selected.
    var accessToken = gapi.auth.getToken().access_token;
    const requests = e.docs.map(doc => axios.get(`https://www.googleapis.com/drive/v3/files/${doc.id}?alt=media`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      responseType: 'blob'
    }));
    const responses = await axios.all(requests);

    const payload = e.docs.map(doc => ({id: doc.id}));
    for (let i = 0; i < responses.length; i++) {
      payload[i].url = URL.createObjectURL(responses[i].data);
    }

    dispatch(appendCandidates(payload));
  }

  return (
    <S.Upload>
      <GooglePicker
        clientId={process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID}
        developerKey={process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}
        scope={['https://www.googleapis.com/auth/drive.readonly']}
        onChange={onChange}
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