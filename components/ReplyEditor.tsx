import { Avatar, Form, Button, List, Input } from 'antd';
import React, { useContext } from 'react';
import Comment from './Comment';
const { TextArea } = Input;
import PropTypes from 'prop-types';

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

import { useState, useEffect } from 'react';
import moment from 'moment';
import { UserContext } from '../context/UserContext';
// eslint-disable-next-line require-jsdoc
const ReplyEditor = ({ postId, comments, submitting, handleChange, handleSubmit, value }) => {
  const data = useContext(UserContext);
  console.log('reply', comments);
  const [commentData, setcommentData] = useState([]);
  useEffect(() => {
    setcommentData(
      comments.map((item) => {
        if (item.author) return item;
        return {
          author: item.username,
          content: item.text,
          avatar: item.profilePic,
          datetime: moment(item.updatedAt).fromNow()
        };
      })
    );
  }, [comments]);

  return (
    <>
      {comments.length > 0 && <CommentList comments={commentData} />}
      <Comment
        avatar={<Avatar src={data.user.profilePic} alt="Han Solo" />}
        content={
          <Editor
            onChange={(e) => handleChange(e)}
            onSubmit={(e) => handleSubmit()}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

ReplyEditor.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default ReplyEditor;
