import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const Comment = dynamic(import('./Comment'));

const CommentList = (props) => {
  console.log('Comment list', props);
  return (
    <>
      {props.comments &&
        props.comments.map((comment) => {
          return <Comment key={comment._id} postId={props.postId} comment={comment} />;
        })}
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string
};

export default CommentList;
