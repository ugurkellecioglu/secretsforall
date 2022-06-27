import React, { createElement, useState } from 'react';
import { Col, Comment, Divider, Row, Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import Editor from './Editor';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import axios from 'axios';

const Demo = (props) => {
  const { userId, postId, id, content, author, avatar, comments: initialComments } = props;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [value, setValue] = useState('');
  const [comments, setComments] = useState(initialComments);

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
    axios
      .post(`/api/reply`, {
        userId: userId,
        postId: postId,
        commentId: id,
        text: value
      })
      .then((result) => {
        setComments((prevState) => {
          return [...prevState, result.data];
        });
      })
      .catch((err) => {});
  };

  const CheckIfReply = () => {
    return (
      <>
        {props.isReply === false ? (
          <span key="comment-basic-reply-to" onClick={(e) => setIsReply(!isReply)}>
            {isReply ? <b>Replying..</b> : <>Reply to</>}
          </span>
        ) : null}
      </>
    );
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
    <CheckIfReply key="comment-basic-reply-to" />
  ];

  return (
    <>
      {props.isReply === false ? <Divider /> : null}
      <Comment actions={actions} author={author} avatar={avatar} content={content} />

      {comments.length > 0 && (
        <div style={{ width: '70%', marginLeft: '50px' }}>
          <CommentList
            isReply={true}
            comments={comments.map((comment) => {
              return {
                author: comment.username,
                avatar: comment.profilePic,
                content: comment.text
              };
            })}
          />
        </div>
      )}
      {isReply && (
        <div>
          <Row>
            <Col span={20} style={{ marginLeft: '7%' }}>
              <Editor maxRow={2} onSubmit={handleReply} value={value} onChange={handleChange} />
            </Col>
          </Row>
        </div>
      )}
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
  author: PropTypes.string,
  isReply: PropTypes.bool
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
  author: '',
  isReply: false
};

export default Demo;
