import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../../core/redux/photo';
import { Button } from 'react-bootstrap';

export default function Login({ children, ...props }) {
  return (
      <S.Login>
        <Button
          variant="primary"
          href="http://udhd.djbaek.com:8080/oauth2/authorization/google"
          block
        >
          Google로 로그인하기
        </Button>
        <Button
          variant="dark"
          href="http://udhd.djbaek.com:8080/oauth2/authorization/apple"
          block
        >
          Apple로 로그인하기
        </Button>
        <Button
          variant="warning"
          href="http://udhd.djbaek.com:8080/oauth2/authorization/kakao"
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