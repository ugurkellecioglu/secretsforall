import React, { createElement, useContext, useState } from 'react';
import { Comment, notification, Tooltip } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import dynamic from 'next/dynamic';

const Reply = dynamic(() => import('./Reply'));
const ReplyEditor = dynamic(() => import('./ReplyEditor'));

import styles from './style.module.scss';
import dayjs from '../../helpers/dayjs';
const Demo = (props) => {
  const { user } = useContext(UserContext);
  const postId = props.postId;
  const { username: author, profilePic: avatar } = props.comment.user;
  const [replies, setReplies] = useState(props.comment.comments);
  const { text: content, _id } = props.comment;
  const [likes, setLikes] = useState(props.comment.likesCount);
  const [action, setAction] = useState<string | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const like = async () => {
    setLikes(1);
    setAction('liked');
    const response = await axios.put(`/api/comments?type=like`, { postId, commentId: _id, user });
    await response.data;
  };

  const handleReply = () => {
    setIsReplying((prevState) => !prevState);
  };
  const postComment = async (commentId, postId, text) => {
    const response = await axios.post(`/api/reply`, {
      user,
      commentId,
      postId,
      text
    });
    if (response.status === 200) {
      notification.success({
        message: 'Comment Posted',
        description: 'You have successfully posted a comment.',
        placement: 'topRight'
      });
      console.log('49,', response.data);
      setReplies((prevState) => [...prevState, response.data]);
    } else {
      notification.warning({
        message: 'Comment Post Error',
        description: 'There was an error posting your comment.',
        placement: 'topRight'
      });
    }
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" onClick={handleReply}>
      {isReplying ? 'Replying...' : 'Reply'}
    </span>,
    <span key="updatedAt">{dayjs(props.comment.updatedAt).fromNow()}</span>
  ];

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);
    postComment(_id, postId, value);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
    }, 1000);
  };

  const handleChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };

  const replyEditorProps = {
    replyId: _id,
    submitting,
    handleSubmit,
    handleChange,
    value
  };

  return (
    <div className={styles.comment}>
      <Comment actions={actions} author={author} avatar={avatar} content={content}>
        {replies &&
          replies.map((reply) => {
            return <Reply key={reply._id} postId={postId} commentId={_id} reply={reply} />;
          })}
        {isReplying && <ReplyEditor {...replyEditorProps} />}
      </Comment>
    </div>
  );
};

Demo.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.string
};

export default Demo;
