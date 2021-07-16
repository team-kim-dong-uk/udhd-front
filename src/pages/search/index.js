import React from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import PhotoGrid from '../../component/PhotoGrid';

export default function SearchPage() {
  return (
    <>
      <AppLayout>
        <HomeLayout>
            <PhotoGrid/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}