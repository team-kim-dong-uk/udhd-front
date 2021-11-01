import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import PhotoGrid from '../../component/PhotoGrid';
import SearchPhotoGrid from '../../component/PhotoGrid/SearchPhotoGrid';
import { getRandomPhotos } from '../../core/redux/photos';

export default function SearchPage() {
  const dispatch = useDispatch();
  const { photos } = useSelector(state => state);

  useEffect(() => {
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