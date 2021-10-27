import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import PhotoGrid from '../../component/PhotoGrid';
import SearchPhotoGrid from '../../component/PhotoGrid/SearchPhotoGrid';
import { getRandomPhotos } from '../../core/redux/photos';

export default function SearchPage() {
  const dispatch = useDispatch();
  const { photos, loading } = useSelector(state => state);

  useEffect(() => {
    if (!loading.data && photos.data.length === 0 && !photos.error) {
      dispatch(getRandomPhotos.request());
    }
  }, [photos, loading])

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