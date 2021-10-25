import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPhotos } from '../../core/redux/photos.js';
// import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import { useInView } from 'react-intersection-observer';

export default function PhotoGrid({ children, ...props }) {
  // const dispatch = useDispatch();
  // const { auth, photos, loading } = useSelector(state => state);

  // const {ref, inView} = useInView();
  // useEffect(() => {
  //   if (inView && auth.data) {
  //     if (photos.data.length == 0) {
  //       dispatch(getPhotos.request({userId: auth.data?.userId}));
  //     } else {
  //       dispatch(getPhotos.request({
  //         userId: auth.data?.userId,
  //         findAfter: photos.data[photos.data.length - 1].photoId,
  //       }));
  //     }
  //   }
  // }, [inView, dispatch, auth, photos])

  const photos = {
    data: [{
      photoId: '123',
      thumbnailLink: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg'
    },{
      photoId: '456',
      thumbnailLink: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg'
    }]
  }

  return (
      <S.PhotoGrid>
          {photos.data.map(photo => (
              <Thumbnail
              key={photo.photoId}
              photoId={photo.photoId}
              thumbnailLink={photo.thumbnailLink}
              />
          ))}
          {/* {!photos.isEnd && <div ref={ref}>로딩중...</div>} */}
      </S.PhotoGrid>
  );
}

PhotoGrid.propTypes = {
};

const S = {};

S.PhotoGrid = styled.div`
  width: 100%;
`;
