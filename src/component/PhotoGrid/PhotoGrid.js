import React, {useEffect} from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail.js';
import {useDispatch, useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";
import {getFeeds, getFeedsLike, getFeedsSave} from "../../core/redux/feed";


const photos = {
  data: [{
    photoId: '123',
    thumbnailLink: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg'
  },{
    photoId: '456',
    thumbnailLink: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/190611_%EC%9D%B4%EB%82%98%EA%B2%BD.jpg'
  }]
}

/*
* Props : {
*   type : String // search, like, save
*
* }
* */
export default function PhotoGrid({ children, ...props }) {
  return (
      <S.PhotoGrid>
          {props.feeds?.map((feed, index) => (
              <Thumbnail
              key={feed?.id}
              photoId={feed?.id}
              thumbnailLink={feed?.photo?.thumbnailLink}
              moveTo={props?.moveTo + `?index=${index}`}
              />
          ))}
          {/* {!photos.isEnd && <div ref={ref}>로딩중...</div>} */}
        <S.CheckForScroll ref={props.ref}/>
      </S.PhotoGrid>
  );
}

PhotoGrid.propTypes = {
};

const S = {};

S.PhotoGrid = styled.div`
  width: 100%;
`;
S.CheckForScroll = styled.div`
  width: 100%;
  margin-top:20px;
`;
