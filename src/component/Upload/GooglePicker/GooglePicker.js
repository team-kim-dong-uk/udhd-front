import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import loadScript from 'load-script';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';

export default function GooglePicker({ children, ...props }) {

  let scriptLoadingStarted = false;

  useEffect(() => {
    if(isGoogleReady()) {
      // google api is already exists
      // init immediately
      onApiLoad();
    } else if (!scriptLoadingStarted) {
      // load google api and the init
      scriptLoadingStarted = true;
      loadScript(GOOGLE_SDK_URL, onApiLoad)
    } else {
      // is loading
    }
  }, []);

  function isGoogleReady() {
    return !!window.gapi;
  }

  function isGoogleAuthReady() {
    return !!window.gapi.auth;
  }

  function isGooglePickerReady() {
    return !!window.google.picker;
  }

  function onApiLoad() {
    window.gapi.load('auth');
    window.gapi.load('picker');
  }

  function doAuth(callback) {
    window.gapi.auth.authorize({
        client_id: props.clientId,
        scope: props.scope,
        immediate: false, //props.authImmediate
      },
      callback
    );
  }

  function onChoose() {
    if (!isGoogleReady() || !isGoogleAuthReady() || !isGooglePickerReady() || props.disabled) {
      return null;
    }

    const token = window.gapi.auth.getToken();
    const oauthToken = token && token.access_token;

    if (oauthToken) {
      createPicker(oauthToken);
    } else {
      doAuth(response => {
        if (response.access_token) {
          createPicker(response.access_token)
        } else {
          props.onAuthFailed(response);
        }
      });
    }
  }

  function createPicker(oauthToken) {

    props.onAuthenticate(oauthToken);

    if(props.createPicker){
      return props.createPicker(google, oauthToken)
    }

    const view = new window.google.picker.DocsView();

    if (props.mimeTypes) {
      view.setMimeTypes(props.mimeTypes.join(','))
    }
    if (props.query) {
      view.setQuery(props.query)
    }

    view.setIncludeFolders(true) 
          .setSelectFolderEnabled(true);

    if (!view) {
      throw new Error('Can\'t find view by viewId');
    }

    const picker = new window.google.picker.PickerBuilder()
                             .addView(view)
                             .setOAuthToken(oauthToken)
                             .setCallback(props.onChange);

    if (props.origin) {
      picker.setOrigin(props.origin);
    }

    // picker.enableFeature(window.google.picker.Feature.NAV_HIDDEN)
    picker.enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)

    picker.build()
          .setVisible(true);
  }

  return (
    <S.GooglePicker>
      <div onClick={onChoose}>
        { 
          props.children ?
            props.children :
            <S.Button variant='outline-primary' size='sm'>Google Drive에서 사진 선택</S.Button>
        }
      </div>
    </S.GooglePicker>
  );
}

GooglePicker.propTypes = {
  clientId: PropTypes.string.isRequired,
  developerKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAuthFailed: PropTypes.func.isRequired,
  mimeTypes: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
};

const S = {};

S.GooglePicker = styled.div`
& .picker {
  height: 100% !important;
  width: 100% !important;
  top: 0 !important;
}
`;

S.Button = styled(Button)`
  width: 100%;
`;