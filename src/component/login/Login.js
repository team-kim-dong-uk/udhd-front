import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap'; 

export default function Login({ children, ...props }) {
  return (
      <S.Login>
        {/* <S.Modal show={true} fullscreen={true}>
          <div>hi</div>
        </S.Modal> */}
        <Button
          variant="primary"
          href={`${process.env.REACT_APP_BACKEND_PREFIX}/oauth2/authorization/google`}
          block
        >
          Google로 로그인하기
        </Button>
        <Button
          variant="dark"
          href={`${process.env.REACT_APP_BACKEND_PREFIX}/oauth2/authorization/apple`}
          block
        >
          Apple로 로그인하기
        </Button>
        <Button
          variant="warning"
          href={`${process.env.REACT_APP_BACKEND_PREFIX}/oauth2/authorization/kakao`}
          block
        >
          Kakao로 로그인하기
        </Button>
      </S.Login>
  );
}

Login.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};

S.Login = styled.div`
padding: 2rem;
`;

S.Modal = styled(Modal)`
  height: '90%';
`;