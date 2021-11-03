import { useEffect } from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Nickname from '../../component/login/Nickname';
import { initAmplitude, sendAmplitudeData } from '../../util/amplitude';
export default function LoginPage() {
  useEffect(() => {
    initAmplitude();
    sendAmplitudeData("set nickname");
  });
  return (
    <>
      <AppLayout>
        <HomeLayout>
          <Nickname/>
        </HomeLayout>
      </AppLayout>
    </>
  );
};