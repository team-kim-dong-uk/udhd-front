import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import Tag from "../../Tag";
import HeartIcon from '../../../../assets/heart-icon.svg';
import HeartIconFilled from '../../../../assets/heart-icon-filled.svg';
import {useDispatch, useSelector} from "react-redux";
import Info from './Info';
import CommentBox from './CommentBox';
import { colors } from '../../../util/style';
import Tags from './Tags';


/*
* Props
* feed : {
*   photo_id : "",
*   img_url : "",
*   tags : [],
*   comments: [],
* }
* */
export default function FeedItem({item}) {
  let inAlbum = true;

  return (
    <S.FeedItem>
      <S.Title>1. title bar</S.Title>
      <S.ImageBox>
          <S.Image src={item.photo.originalLink}/>
      </S.ImageBox>
      <Info data={item.photo}/>
      <Tags data={item.photo}/>
      <CommentBox comments={item.comments}/>
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
  padding: 15px;
  padding-bottom: 30px;
`;
S.Title = styled.div`

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
  display: flex;
  justify-content: center;
  width: 90%;
`;
S.Image = styled.img`
  height: auto
`;
S.TagContainer = styled.div`
    padding: 20px;
`;


