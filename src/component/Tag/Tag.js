import React from 'react';
import styled from 'styled-components';

export default function Tag({ children, ...props }) {

  return (
      <S.Button>
          {children}
      </S.Button>
  );
}

Tag.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Button = styled.button`
    margin-right: 5px;
    padding-left: 8px;
    padding-right: 8px;
    border-style: solid;
    border-radius: 3px;
    border-color: #bbbbbb;
    height: 24px;
    background-color: white;
    margin-bottom: 5px;
  //TODO: font size
    //font-size
`;

