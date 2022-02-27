import React, { createElement, useState } from 'react';
import { Col, Comment, Row, Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import Editor from './Editor';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import CommentList from './CommentList';
import axios from 'axios';

const Demo = (props) => {
  const { userId, postId, id, content, author, avatar, comments } = props;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [value, setValue] = useState('');
  const handleChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const [isReply, setIsReply] = useState(false);
  const handleReply = () => {
    console.log('we are replying to', props);
    console.log('with value', value);
    axios
      .post(`/api/reply`, {
        userId: userId,
        postId: postId,
        commentId: id,
        text: value
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to" onClick={(e) => setIsReply(!isReply)}>
      {isReply ? <b>Replying..</b> : <>Reply to</>}
    </span>
  ];

  return (
    <>
      <Comment actions={actions} author={author} avatar={avatar} content={content} />
      {comments.length > 0 && <CommentList comments={comments} />}
      <AnimatePresence>
        {isReply && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <Row>
              <Col span={20} style={{ marginLeft: '7%' }}>
                <Editor maxRow={2} onSubmit={handleReply} value={value} onChange={handleChange} />
              </Col>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Demo.propTypes = {
  comments: PropTypes.array,
  userId: PropTypes.string,
  postId: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string,
  avatar: PropTypes.string,
  author: PropTypes.string
};
Demo.defaultProps = {
  likes: 0,
  dislikes: 0,
  userId: '',
  postId: '',
  id: '',
  comments: [],
  content: '',
  avatar: '',
  author: ''
};

export default Demo;
