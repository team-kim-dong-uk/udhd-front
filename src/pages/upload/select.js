import React from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Upload from '../../component/Upload';

export default function SelectDriveFilePage() {
  return (
    <>
      <AppLayout>
        <HomeLayout>
            <Upload />
        </HomeLayout>
      </AppLayout>
    </>
  )
}