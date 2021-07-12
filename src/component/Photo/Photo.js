import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../../core/redux/photo';

export default function Photo({ children, ...props }) {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPhoto.request(props.photoId));
    }, [dispatch]);
    const photo = useSelector(state => state.photo);
  return (
      <S.Photo>
        <div>사진정보</div>
        <div>
          {photo.data ? photo.data.favouriteCount + 'ppl likes\n' : '로딩중'}
        </div>
        {photo.data ? photo.data.tags : '로딩중'}
        {children}
      </S.Photo>
  );
}

Photo.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};

S.Photo = styled.div`
`;