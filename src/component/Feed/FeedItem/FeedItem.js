import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Info from './Info';
import CommentBox from './CommentBox';
import { colors } from '../../../util/style';
import Tags from './Tags';

export default function FeedItem({item}) {

  return (
    <S.FeedItem>
      <S.Title>1. title bar</S.Title>
      <S.ImageBox>
          <S.Image src={item.photo.originalLink}/>
      </S.ImageBox>
      <S.InfoContainer>
        <Info data={item.photo}/>
        <Tags data={item.photo}/>
        <CommentBox data={item}/>
      </S.InfoContainer>
    </S.FeedItem>
  );
}

FeedItem.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};
S.FeedItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.black};
  width: 100%;
  margin-bottom: 10px;
`;
S.Title = styled.div`

`;

S.InfoContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  width: 100%;
`;
S.IconContainer = styled.div`
  overflow: auto;
  display: inline-flex;
  padding:5px;
  
`;
S.Icon = styled.p`
  //background-color: pink;
    margin: 5px;
    min-width: 40px;
    height: 40px;
`;
S.ImageBox = styled.div`
  overflow: auto;
`;
S.Image = styled.img`
  width: 100%;
  height: auto;
`;
S.TagContainer = styled.div`
`;


