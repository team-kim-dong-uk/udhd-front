import React from 'react';
import styled from 'styled-components';
import TagIcon from '../../../../../assets/tag-icon-no-border.svg';
import TagIconActive from '../../../../../assets/tag-icon-no-border-active.svg';
import { colors } from '../../../../util/style';
import Link from 'next/link';

export default function Tag({ text, active }) {

  return (
    <Link href={`/search/tags/${text}`}>
        {
            active
            ?
                <S.TagActive>
                    <S.TagIconActive width={15} height={15}/>
                    <span style={{color:colors.orange}}>{text}</span>
                </S.TagActive>
            :
                <S.Tag>
                    <S.TagIcon width={15} height={15}/>
                    <span>{text}</span>
                </S.Tag>
        }
    </Link>
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
S.TagActive = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.orange};
  border-radius: 5px;
  padding-left: 8px;
  padding-right: 10px;
  margin-right: 5px;
  margin-bottom: 10px;
`;
S.TagIcon = styled(TagIcon)`
  //border: 1px solid black;
  margin-right: 5px;
`;

S.TagIconActive = styled(TagIconActive)`
  //border: 1px solid black;
  margin-right: 5px;
`;
