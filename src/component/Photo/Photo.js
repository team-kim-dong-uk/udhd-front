import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../../core/redux/photo';

export default function Photo({ children, ...props }) {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPhoto.request());
    }, [dispatch]);
    const photo = useSelector(state => state.photo);
    console.log(photo);
  return (
      <S.Photo>
        {photo.data ? photo.data.favouriteCount + 'ppl likes\n' : '로딩중'}
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
  width: 36.25rem;
  height: 23.625rem;
  padding: 4.5rem 4rem;
`;