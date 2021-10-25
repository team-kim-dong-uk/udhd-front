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
  const dispatch = useDispatch();
  const { auth, feed } = useSelector(state => state);

   useEffect(() => {
     if (auth.data) {
       switch (props.type){
         case 'like':
          if(feed.feedsLike?.data?.length === 0)
              dispatch(getFeedsLike.request({
                  type: props.type,
                  userId: auth.data?.userId
              }))
           break;
         case 'save':
             if(feed.feedsSave?.data?.length === 0)
                 dispatch(getFeedsSave.request({
                     type: props.type,
                     userId: auth.data?.userId
                 }))
           break;
         default:
             if(feed.feeds.data.length === 0)
                dispatch(getFeeds.request());
       }
    }
  }, [dispatch, auth, props.type])

  return (
      <S.PhotoGrid>
          {photos.data.map(photo => (
              <Thumbnail
              key={photo.photoId}
              photoId={photo.photoId}
              thumbnailLink={photo.thumbnailLink}
              />
          ))}
          {/* {!photos.isEnd && <div ref={ref}>로딩중...</div>} */}
      </S.PhotoGrid>
  );
}

PhotoGrid.propTypes = {
};

const S = {};

S.PhotoGrid = styled.div`
  width: 100%;
`;
