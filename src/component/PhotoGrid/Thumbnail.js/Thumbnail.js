import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import Link from 'next/link'

export default function Thumbnail({ photoId, thumbnailLink, moveTo}) {
  return (
    <S.Thumbnail>
      <Link href={moveTo}>
        <S.Image src={thumbnailLink} thumbnail={true} />
      </Link>
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
