import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

import dynamic from 'next/dynamic';

const Editor = dynamic(import('./Editor'));

const ReplyEditor = ({ submitting, handleChange, handleSubmit, value }) => {
  return (
    <div className={styles.editor}>
      <Editor
        onChange={(e) => handleChange(e)}
        onSubmit={(e) => handleSubmit()}
        submitting={submitting}
        value={value}
      />
    </div>
  );
};

ReplyEditor.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

ReplyEditor.defaultProps = {
  comments: [],
  submitting: false,
  handleChange: () => {},
  handleSubmit: () => {},
  value: ''
};

export default ReplyEditor;
