import { List } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const Comment = dynamic(import('./Comment'));

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
