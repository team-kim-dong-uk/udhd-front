import React from 'react';
import styled from 'styled-components';
import TagIcon from '../../../assets/tag-icon-no-border.svg';

export default function Tag({ children, ...props }) {

  return (
      <S.Tag>
          <TagIcon/>
          <span>text</span>
      </S.Tag>
  );
}

Tag.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Tag = styled.div`
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

