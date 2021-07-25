import React from 'react';
import styled from 'styled-components';

export default function TagPlane({ children, ...props }) {
  return (
    <S.TagPlane>
      태그들
    </S.TagPlane>
  );
}

TagPlane.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};

S.TagPlane = styled.div`
  border: 1px solid;
  height: 150px;
  width: 100%;
  position: fixed;
  bottom: 118px;
  background: white;
`;