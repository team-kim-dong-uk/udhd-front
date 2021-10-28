import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import Link from 'next/link'

export default function Thumbnail({ photoId, thumbnailLink, moveTo}) {
  return (
      <S.Wrapper>
    <S.Thumbnail>
      <Link href={moveTo}>
          <S.Center>
              <S.Image src={thumbnailLink} thumbnail={true} />
          </S.Center>
      </Link>
    </S.Thumbnail>
      </S.Wrapper>
  );
}

Thumbnail.propTypes = {
  photoId: PropTypes.string.isRequired,
  thumbnailLink: PropTypes.string.isRequired
};

const S = {};
S.Wrapper = styled.div`
  width: 33%;
  display: inline-block;
`;
S.Thumbnail = styled.div`
  //border: 1px solid;
  position: relative;
  width: 100%;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
    font-size: 0;
  }
  /*&:after{
    content: "";
    display: block;
    padding-bottom: 0;
  }*/
`;
S.Center = styled.div`
  position: absolute; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  -webkit-transform: translate(50%,50%); 
  -ms-transform: translate(50%,50%); 
  transform: translate(50%,50%);
`;

S.Image = styled(Image)`
  position:  absolute;
  top: 0;
  left: 0;
  /*bottom: 0;
  right: 0;*/

  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  
  //object-position: center;
  padding: 0px; // override;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
