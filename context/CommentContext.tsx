import { createContext, useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const CommentContext = createContext(null);

export const CommentProvider = ({ children }) => {
  const [comment, setComment] = useState('');
  return (
    <CommentContext.Provider value={{ comment, setComment }}>{children}</CommentContext.Provider>
  );
};

CommentProvider.propTypes = {
  children: PropTypes.node
};
