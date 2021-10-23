import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function Thumbnail({ photoId, thumbnailLink }) {
  return (
    <S.Thumbnail>
      <a href={`feed/${photoId}`}>
      <S.Image src={thumbnailLink} thumbnail={true} />
      </a>
    </S.Thumbnail>
  );
}

Thumbnail.propTypes = {
  photoId: PropTypes.string.isRequired,
  thumbnailLink: PropTypes.string.isRequired
};

const S = {};

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