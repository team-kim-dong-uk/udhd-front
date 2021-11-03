import React, {useEffect} from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail.js/index.js';
import {useInView} from "react-intersection-observer";
import {useDispatch, useSelector} from "react-redux";
import {getRandomPhotos} from "../../core/redux/photos";
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../util/amplitude/index.js';

export default function SearchPhotoGrid({ data }) {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView){
            initAmplitude();
            setAmplitudeUserId(auth.data?.userId);
            sendAmplitudeData("search feed more");
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
      </S.SearchPhotoGrid>
  );
}

SearchPhotoGrid.propTypes = {
};

const S = {};

S.SearchPhotoGrid = styled.div`
  width: 100%;
  line-height: 0 !important;
`;
S.CheckForScroll = styled.div`
  width: 100%;
  margin-top:20px;
`;
