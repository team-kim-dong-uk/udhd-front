import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import PhotoGrid from '../../component/PhotoGrid';
import SearchPhotoGrid from '../../component/PhotoGrid/SearchPhotoGrid';
import { getRandomPhotos } from '../../core/redux/photos';
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../util/amplitude';
import Tags from "../../component/Feed/FeedItem/Tags";
import tags from "../../core/redux/tags";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { photos, auth } = useSelector(state => state);

  let tagsData = {
      tags: [
          '단체', "효정", '미미', '유아', '승희', '지호', '비니', '아린'
      ].concat(['직찍', '인별', '비하인드', '공식', '화보', '네이버포스트', 'MV'].sort(() => Math.random() - 0.5).slice(0, 3))
  };

  useEffect(() => {
      initAmplitude();
      setAmplitudeUserId(auth.data?.userId);
      sendAmplitudeData("search");
      dispatch(getRandomPhotos.request());
  }, []);

  return (
    <>
      <AppLayout>
        <HomeLayout>
            <Tags style={{padding: 10}} data={tagsData}/>
            <SearchPhotoGrid data={photos.data}/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}
