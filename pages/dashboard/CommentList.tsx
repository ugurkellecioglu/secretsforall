import { List } from 'antd';
import Comment from './Comment';
import React from 'react';
import PropTypes from 'prop-types';

const CommentList = ({ comments, isReply }) => {
  return (
    <>
      {isReply === true ? (
        <List
          dataSource={comments}
          itemLayout="horizontal"
          renderItem={(props) => <Comment {...props} isReply={true} />}
        />
      ) : (
        <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={(props) => <Comment {...props} />}
        />
      )}
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  isReply: PropTypes.bool
};

CommentList.defaultProps = {
  comments: [],
  isReply: false
};

export default CommentList;
