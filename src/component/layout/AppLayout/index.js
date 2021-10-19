import Router from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

export default function AppLayout({ children, ...props}) {
  // const dispatch = useDispatch();
  // const auth = useSelector(state => state.auth);

  // const setUser = async () => {
  //   try {
  //     // refresh token으로 유저 정보, access token 요청
  //     const tokenResponse = await authAPI.refreshToken();
  //     dispatch(loginSuccess(tokenResponse.data));
  //   } catch (e) {
  //     // refresh token이 잘못되어 401에러 발생시 login 페이지로 이동.
  //     if (e?.response?.status === 401) {
  //       Router.push('/login');
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!auth.data) {
  //     //TODO: 나중에 되돌리기
  //     //setUser();
  //   }
  // }, [auth]);


  return <S.Container {...props}>{children}</S.Container>;
}

const S = {};
S.Container = styled.div`
`;
