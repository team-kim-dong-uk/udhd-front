import React from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';

export default function MyPage() {
  return (
    <>
      <AppLayout>
        <HomeLayout>
          내 정보 페이지
        </HomeLayout>
      </AppLayout>
    </>
  )
}