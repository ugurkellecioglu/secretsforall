import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const Comment = dynamic(import('./Comment'));

const CommentList = (props) => {
  console.log('comment list props', props);
  return (
    <>
      {props.comments &&
        props.comments.map((comment) => {
          return <Comment key={comment.id} postId={props.postId} comment={comment} />;
        })}
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string
};

export default CommentList;
