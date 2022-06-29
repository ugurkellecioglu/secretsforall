import React, { useContext, useState } from 'react';
import { Card, notification } from 'antd';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import styles from './style.module.scss';
import dynamic from 'next/dynamic';
import CommentList from './CommentList';

const ReplyEditor = dynamic(import('./ReplyEditor'));
const Secret = dynamic(import('./Secret'));

function SecretPost({ postId, title, text, onClick, comments: initialComments }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState(initialComments);
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  console.log('secret post post Id', postId);
  const postComment = async (postId, text) => {
    const response = await axios.post(`/api/comments`, {
      user,
      postId,
      text
    });
    if (response.status === 200) {
      notification.success({
        message: 'Comment Posted',
        description: 'You have successfully posted a comment.',
        placement: 'topRight'
      });
      setComments((prevState) => [...prevState, response.data]);
    } else {
      notification.warning({
        message: 'Comment Post Error',
        description: 'There was an error posting your comment.',
        placement: 'topRight'
      });
    }
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);
    postComment(postId, value);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
    }, 1000);
  };

  const handleChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };

  const props = {
    postId,
    submitting,
    handleSubmit,
    handleChange,
    comments,
    value
  };
  return (
    <Card className={styles.card}>
      <Secret title={title} text={text} onClick={onClick} />
      <CommentList postId={postId} comments={comments} />
      <ReplyEditor {...props} />
    </Card>
  );
}

SecretPost.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string,
  title: PropTypes.element,
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default React.memo(SecretPost);
