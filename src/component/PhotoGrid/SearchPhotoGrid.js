import React, {useEffect} from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail.js/index.js';
import {useInView} from "react-intersection-observer";
import {useDispatch} from "react-redux";
import {getRandomPhotos} from "../../core/redux/photos";

export default function SearchPhotoGrid({ data }) {
    const dispatch = useDispatch();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView){
            dispatch(getRandomPhotos.request())
        }
    },[inView])
  return (
      <S.SearchPhotoGrid>
          {data?.map(photo => (
              <Thumbnail
              key={photo.photoId}
              photoId={photo.photoId}
              thumbnailLink={photo.thumbnailLink}
              moveTo={`/search/related/${photo.photoId}`}
              />
          ))}
          <S.CheckForScroll ref={ref}/>
          {/* {!photos.isEnd && <div ref={ref}>로딩중...</div>} */}
      </S.SearchPhotoGrid>
  );
}

SearchPhotoGrid.propTypes = {
};

const S = {};

S.SearchPhotoGrid = styled.div`
  width: 100%;
`;
S.CheckForScroll = styled.div`
  width: 100%;
  margin-top:20px;
`;
