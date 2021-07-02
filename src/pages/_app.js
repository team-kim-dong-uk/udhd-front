import React from 'react';
import PropTypes from 'prop-types';
import { Normalize } from 'styled-components';
import Head from 'next/head';
import wrapper from '../core/config/redux';
import { GlobalStyle } from '../util/GlobalStyle';

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
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
