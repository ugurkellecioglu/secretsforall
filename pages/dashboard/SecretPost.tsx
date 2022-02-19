import React, { useContext, useEffect, useState } from 'react';
import ReplyEditor from '../../components/ReplyEditor';
import Secret from '../../components/Secret';
import Comment from '../../components/Comment';
import { Card, notification } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import styles from './index.module.css';
function SecretPost({ postId, title, text, onClick, comments }) {
  const { user } = useContext(UserContext);
  const [commentss, setComments] = useState([]);
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (comments) {
      setComments(comments);
    }
  }, [comments]);

  const postComment = async (userId, postId, text) => {
    const response = await axios.post(`/api/comments`, {
      userId,
      postId,
      text
    });
    if (response.status === 200) {
      notification.success({
        message: 'Comment Posted',
        description: 'You have successfully posted a comment.',
        placement: 'topRight'
      });
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
    postComment(user._id, postId, value);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...commentss,
        {
          author: user.username,
          avatar: user.profilePic,
          content: <p>{value}</p>,
          datetime: moment().fromNow()
        }
      ]);
    }, 1000);
  };

  const handleChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };

  return (
    <Card className={styles.card}>
      <Secret title={title} text={text} onClick={onClick} />
      <Comment />
      <ReplyEditor
        postId={postId}
        submitting={submitting}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        comments={commentss}
        value={value}
      />
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
