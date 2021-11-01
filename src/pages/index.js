import Head from 'next/head';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../core/config/redux';
import AppLayout from '../component/layout/AppLayout';
import HomeLayout from '../component/layout/HomeLayout';

const Home = () => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>어덕행덕 | 홈</title>
        </Head>
        <HomeLayout />
      </AppLayout>
    </>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => {
    async (context) => {
      const cookie = context.req ? context.req.header.cookie : '';
      axios.defaults.headers.Cookie = '';

      if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }

      /*
      context.store.dispatch(
        login.request({email : 'email', password: 'password'}),
      );
      */

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
  }
)

export default Home;
