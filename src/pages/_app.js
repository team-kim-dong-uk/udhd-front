import React from 'react';
import PropTypes from 'prop-types';
import { Normalize } from 'styled-normalize';
import Head from 'next/head';
import wrapper from '../core/config/redux';
import GlobalStyle from '../util/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
      <meta name="naver-site-verification" content="19a4c6afea5b623d575176d1895ee769081aba02" />
      <meta name="google-site-verification" content="zSINZOjndLVYHkjexqqeJpNpiPwvqifXMEpVLhHVT5A" />

    <meta property="og:title" content="어덕행덕" />
    <meta property="og:type" content="website" />
{/*    <meta property="og:image" content="/static/favicon" />*/}
    <meta property="og:description" content="미라클을 위한 사진 플랫폼" />

        <title>어덕행덕</title>
    </Head>
    <Component />
    <GlobalStyle />
    <Normalize />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
