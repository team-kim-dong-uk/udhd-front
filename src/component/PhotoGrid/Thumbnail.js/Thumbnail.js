import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

export default function Thumbnail({ children, ...props }) {
  return (
    <S.Thumbnail src={props.thumbnailLink} thumbnail={true}>
    </S.Thumbnail>
  );
}

Thumbnail.propTypes = {
  photoId: PropTypes.string.isRequired,
  thumbnailLink: PropTypes.string.isRequired
};

const S = {};

S.Thumbnail = styled(Image)`
  border: 1px solid;
  width: 33%;
`;