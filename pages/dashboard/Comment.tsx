import React, { createElement, useContext, useState } from 'react';
import { Col, Comment, Row, Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import Editor from './Editor';

import { motion, AnimatePresence } from 'framer-motion';
const Demo = (props): any => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
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
      <Comment actions={actions} {...props} />
      <AnimatePresence>
        {isReply && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <Row>
              <Col span={20} style={{ marginLeft: '7%' }}>
                <Editor maxRow={2} />
              </Col>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Demo;
