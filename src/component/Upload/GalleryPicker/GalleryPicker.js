import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export default function GalleryPicker({ children, ...props }) {

  return (
    <S.GalleryPicker>
      <S.Button variant='outline-primary' size='sm'>갤러리에서 사진 선택(todo)</S.Button>
    </S.GalleryPicker>
  );
}

GalleryPicker.propTypes = {
};

const S = {};

S.GalleryPicker = styled.div`
& .picker {
}
`;

S.Button = styled(Button)`
  width: 100%;
`;