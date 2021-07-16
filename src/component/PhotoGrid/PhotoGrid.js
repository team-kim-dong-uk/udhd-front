import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail.js';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../core/redux/photos.js';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';

export default function PhotoGrid({ children, ...props }) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (auth.data) {
      dispatch(getPhotos.request(auth.data?.userId));
    }
  }, [dispatch, auth]);
  const photos = useSelector(state => state.photos);

  const {ref, inView} = useInView();
  useEffect(() => {
    if (inView && auth.data) {
      dispatch(getPhotos.request(auth.data?.userId));
    }
  }, [inView, dispatch, auth])

  return (
      <S.PhotoGrid>
          {photos.data.map(photo => (
              <Thumbnail
              // key={photo.photoId}
              photoId={photo.photoId}
              thumbnailLink={photo.thumbnailLink}
              />
          ))}
          {photos.data.length && <div ref={ref}>a</div>}
      </S.PhotoGrid>
  );
}

Thumbnail.propTypes = {
};

const S = {};

S.PhotoGrid = styled.div`
`;