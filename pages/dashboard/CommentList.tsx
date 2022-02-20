import { List } from 'antd';
import Comment from './Comment';
import React from 'react';
import PropTypes from 'prop-types';
const CommentList = ({ comments }) => {
  console.log('commentlist comments, ', comments);
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

CommentList.propTypes = {
  comments: PropTypes.array
};

export default CommentList;
