import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import PhotoGrid from '../../component/PhotoGrid';
import SearchPhotoGrid from '../../component/PhotoGrid/SearchPhotoGrid';
import { getRandomPhotos } from '../../core/redux/photos';
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../util/amplitude';

export default function SearchPage() {
  const dispatch = useDispatch();
  const { photos, auth } = useSelector(state => state);

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
            <SearchPhotoGrid data={photos.data}/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}