import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Comment, Tooltip } from 'antd';
import React, { createElement, useState } from 'react';
import styles from './style.module.scss';
import dayjs from '../../helpers/dayjs';

import PropTypes from 'prop-types';
import axios from '../../helpers/axios';

const Reply = (props) => {
  const { username: author, profilePic: avatar } = props.reply.user;
  const { text: content } = props.reply;

  const [likes, setLikes] = useState(props.reply.likesCount);
  const [action, setAction] = useState<string | null>(null);

  const like = async () => {
    setLikes((prevState) => prevState + 1);
    const response = await axios.put(`/api/reply?type=like`, {
      postId: props.postId,
      commentId: props.commentId,
      replyId: props.reply.id,
      user: props.reply.user
    });
    const result = await response.data;
    console.log(result);
    setAction('liked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span key="updatedAt">{dayjs(props.reply.updatedAt).fromNow()}</span>
  ];
  console.log('Reply', props);
  return (
    <div className={styles.comment}>
      <Comment actions={actions} author={author} avatar={avatar} content={content} />
    </div>
  );
};

Reply.propTypes = {
  reply: PropTypes.object,
  postId: PropTypes.string,
  commentId: PropTypes.string
};

export default Reply;
