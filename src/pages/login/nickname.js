import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Nickname from '../../component/login/Nickname';
export default function LoginPage() {
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