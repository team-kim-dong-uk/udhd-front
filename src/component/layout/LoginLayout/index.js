import React from 'react';
import Login from './login';

export default function LoginLayout() {
  return(
    <>
      <Login>
        <Login.Title>Register / Log in</Login.Title>
        <Login.Text>
          로그인
          <br />
        </Login.Text>
        <Login.Button />
      </Login>
    </>
  )
}
