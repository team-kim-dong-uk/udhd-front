import React from 'react';
import styled from 'styled-components';
import TagIcon from '../../../../../assets/tag-icon-no-border.svg';
import { colors } from '../../../../util/style';

export default function Tag({ text }) {

  return (
      <S.Tag>
          <S.TagIcon width={10} height={10}/>
          <span>{text}</span>
      </S.Tag>
  );
}

Tag.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.Tag = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.grey};
  border-radius: 5px;
  padding-left: 8px;
  padding-right: 10px;
  margin-right: 5px;
  margin-bottom: 10px;
`;
S.TagIcon = styled(TagIcon)`
  svg {
    width: 5px;
    height: 5px;
  }
  border: 1px solid black;
  margin-right: 5px;
`;

