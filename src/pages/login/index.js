import { useEffect } from 'react';
import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Login from '../../component/login';
import { initAmplitude, sendAmplitudeData } from '../../util/amplitude';
export default function LoginPage() {
  useEffect(() => {
    initAmplitude();
    sendAmplitudeData("login");
  });
  return (
    <>
      <AppLayout>
        <HomeLayout>
          <Login />
        </HomeLayout>
      </AppLayout>
    </>
  );
};