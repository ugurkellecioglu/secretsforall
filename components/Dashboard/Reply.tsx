import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Comment, Tooltip } from 'antd';
import React, { createElement, useContext, useEffect, useState } from 'react';
import styles from './style.module.scss';
import dayjs from '../../helpers/dayjs';

import PropTypes from 'prop-types';
import axios from '../../helpers/axios';
import { UserContext } from '../../context/UserContext';

const Reply = (props) => {
  const { username: author, profilePic: avatar } = props.reply.user;
  const { text: content } = props.reply;
  const [likes, setLikes] = useState(props.reply.likesCount);
  const [action, setAction] = useState<string | null>(null);
  const { user } = useContext(UserContext);
  console.log('Reply', props);
  useEffect(() => {
    const userIdsWhoLiked = props.reply?.likes?.reduce(
      (prev, curr) => [...prev, curr.user._id],
      []
    );
    console.log('userIdsWhoLiked', userIdsWhoLiked);

    const isLiked = userIdsWhoLiked?.includes(user._id);
    setAction(isLiked ? 'liked' : null);
  }, [props]);
  const like = async () => {
    if (action === 'liked') {
      setLikes((prevState) => prevState - 1);
      await axios.put(`/api/reply?type=unlike`, {
        postId: props.postId,
        commentId: props.commentId,
        replyId: props.reply._id,
        user: props.reply.user
      });
      return setAction('');
    }
    setLikes((prevState) => prevState + 1);
    setAction('liked');
    const response = await axios.put(`/api/reply?type=like`, {
      postId: props.postId,
      commentId: props.commentId,
      replyId: props.reply._id,
      user
    });
    await response.data;
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

export default React.memo(Reply);
