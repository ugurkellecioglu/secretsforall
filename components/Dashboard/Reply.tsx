import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Comment, Tooltip } from 'antd';
import React, { createElement, useState } from 'react';
import styles from './style.module.scss';
import dayjs from '../../helpers/dayjs';

import PropTypes from 'prop-types';

const Reply = (props) => {
  const { username: author, profilePic: avatar } = props.reply.user;
  const { text: content } = props.reply;

  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
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
  reply: PropTypes.object
};

export default Reply;
