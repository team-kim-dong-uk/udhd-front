import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import MyInfo from "../../component/MyInfo";
import { initAmplitude, sendAmplitudeData, setAmplitudeUserId } from '../../util/amplitude';

export default function MyPage() {
  const { auth } = useSelector(state => state);
  useEffect(() => {
    initAmplitude();
    setAmplitudeUserId(auth.data?.userId);
    sendAmplitudeData("mypage");
  }, [])
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
