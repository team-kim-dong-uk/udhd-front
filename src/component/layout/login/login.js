import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Login from './Login';

export default function Login({ children, ...props }) {
  return <S.Container {...props}>{children}</S.Container>;
}

Login.Title = ({ children, ...props }) => {
  const style = useMemo(() => ({ fontSize: '40px', textAlign: 'center' }), []);
  return (
    <Paragraph type="home_card" title style={style} {...props}>
      {children}
    </Paragraph>
  );
};

Login.Text = ({ children, ...props }) => {
  const style = useMemo(() => ({ fontSize: '15px', textAlign: 'center' }), []);
  return (
    <Paragraph type="home_card" content style={style} {...props}>
      {children}
    </Paragraph>
  );
};


Login.Button = function LoginButton() {
  return (
    <S.ButtonWrap>
      <WithLoginButton provider="GOOGLE">
        {(props) => <GoogleLoginButton {...props} />}
      </WithLoginButton>
      <WithLoginButton provider="KAKAO">
        {(props) => <KakaoLoginButton {...props} />}
      </WithLoginButton>
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
  width: 36.25rem;
  height: 23.625.rem;
  padding: 4.5rem 4rem;
`;

S.ButtonWrap = styled.div`
  padding-top: 25px;
  display: flex !important;
  justify-content: space-evenly !important;
`;
