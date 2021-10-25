import React from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import MyInfo from "../../component/MyInfo";

export default function MyPage() {
  return (
    <>
      <AppLayout>
        <HomeLayout>
          <MyInfo/>
        </HomeLayout>
      </AppLayout>
    </>
  )
}
