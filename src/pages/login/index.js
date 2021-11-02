import AppLayout from '../../component/layout/AppLayout';
import HomeLayout from '../../component/layout/HomeLayout';
import Login from '../../component/login';
export default function LoginPage() {
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