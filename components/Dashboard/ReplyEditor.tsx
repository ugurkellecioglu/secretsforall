import React from 'react';
import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import dayjs from '../../helpers/dayjs';

import CommentList from './CommentList';
import Editor from './Editor';
// eslint-disable-next-line require-jsdoc
const ReplyEditor = ({ postId, comments, submitting, handleChange, handleSubmit, value }) => {
  const [commentData, setcommentData] = useState([]);
  useEffect(() => {
    setcommentData(
      comments.map((item) => {
        return {
          ...item,
          postId,
          author: item.username,
          content: item.text,
          avatar: item.profilePic,
          datetime: dayjs(item.updatedAt).fromNow()
        };
      })
    );
  }, [comments]);

  return (
    <>
      {comments.length > 0 && <CommentList comments={commentData} />}
      <Editor
        onChange={(e) => handleChange(e)}
        onSubmit={(e) => handleSubmit()}
        submitting={submitting}
        value={value}
      />
    </>
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
