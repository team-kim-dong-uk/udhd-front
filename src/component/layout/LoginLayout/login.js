import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleLoginButton from '../../common/GoogleLoginButton';
import KakaoLoginButton from '../../common/KakaoLoginButton';

export default function Login({ children, ...props }) {
  return <S.Container {...props}>{children}</S.Container>;
}

Login.Title = ({ children, ...props }) => {
  const style = useMemo(() => ({ fontSize: '40px', textAlign: 'center' }), []);
  return (
    <div type="home_card" title style={style} {...props}>
      {children}
    </div>
  );
};

Login.Text = ({ children, ...props }) => {
  const style = useMemo(() => ({ fontSize: '15px', textAlign: 'center' }), []);
  return (
    <div type="home_card" content style={style} {...props}>
      {children}
    </div>
  );
};


Login.Button = function LoginButton() {
  return (
    <S.ButtonWrap>
      <GoogleLoginButton />
      <KakaoLoginButton />
    </S.ButtonWrap>
  )
}

Login.propTypes = {
  children: PropTypes.node.isRequired,
};

Login.Title.propTypes = {
  children: PropTypes.string.isRequired,
};

Login.Text.propTypes = {
  children: PropTypes.array.isRequired,
};

const S = {};
S.Container = styled.div`
`;

S.ButtonWrap = styled.div`
`;
