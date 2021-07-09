import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../../core/redux/photo';

export default function Login({ children, ...props }) {
  return (
      <S.Login>
        <a href="http://udhd.djbaek.com:8080/oauth2/authorization/google">google</a>
        <a href="http://udhd.djbaek.com:8080/oauth2/authorization/apple">apple</a>
        <a href="http://udhd.djbaek.com:8080/oauth2/authorization/kakao">kakao</a>
      </S.Login>
  );
}

Login.propTypes = {
  // children: PropTypes.node.isRequired,
};

const S = {};

S.Login = styled.div`
  width: 36.25rem;
  height: 23.625rem;
  padding: 4.5rem 4rem;
`;