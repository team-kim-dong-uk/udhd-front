import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { logout } from './authHelper';

const AuthContext = createContext([{ data : null }, logout]);

const AuthProvider = ({ children }) => {
  const { data, error } = useSelector((state) => ({
    data: state.auth.data,
    error: state.auth.error,
  }));

  if (error) {
    return (<LoginPage />);
  }

  return (
    <AuthContext.Provider value={[{ data }, logout]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
