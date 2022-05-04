import { createContext, useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children, secretText, setSecretText, handlePostSecret }) => {
  const [showShareSecretModal, setShowShareSecretModal] = useState(false);
  return (
    <DashboardContext.Provider
      value={{
        showShareSecretModal,
        setShowShareSecretModal,
        secretText,
        setSecretText,
        handlePostSecret
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;

DashboardProvider.propTypes = {
  children: PropTypes.node,
  secretText: PropTypes.string,
  setSecretText: PropTypes.func,
  handlePostSecret: PropTypes.func
};
