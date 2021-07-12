import { useRouter } from 'next/router';
import React from 'react';
import AppLayout from '../../component/layout/AppLayout';
import Photo from '../../component/Photo';

export default function PhotoPage() {
  const router = useRouter();
  const {query: {photoId}} = router;
  return (
    <>
      <AppLayout>
       <Photo photoId={photoId}/>
      </AppLayout>
    </>
  )
}