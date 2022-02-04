import React from 'react';
import ReplyEditor from './ReplyEditor';
import Secret from './Secret';
import Comment from './Comment';
import { Card } from 'antd';
function SecretPost({ title, text, onClick }) {
  return (
    <>
      <Card>
        <Secret title={title} text={text} onClick={onClick} />
        <Comment />
        <ReplyEditor />
      </Card>
    </>
  );
}

export default SecretPost;
