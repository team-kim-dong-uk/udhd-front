import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap'; 
import logo from '../../../assets/drawable-hdpi/symbol_black.webp';
import brandText from '../../../assets/drawable-hdpi/brand_text.webp';
import Image from 'next/image';

export default function Login({ children, ...props }) {
  return (
      <S.Login>
        <Image src={logo}/>
        <Image src={brandText}/>
        <Button
          variant="warning"
          href={`${process.env.REACT_APP_BACKEND_PREFIX}/oauth2/authorization/kakao`}
          block
        >
          Kakao로 로그인하기
        </Button>
        <Button
          variant="primary"
          href={`${process.env.REACT_APP_BACKEND_PREFIX}/oauth2/authorization/google`}
          block
        >
          Google로 로그인하기
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