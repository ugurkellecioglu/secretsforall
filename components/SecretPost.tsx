import React from 'react';
import ReplyEditor from './ReplyEditor';
import Secret from './Secret';
import Comment from './Comment';
import { Card } from 'antd';
import PropTypes from 'prop-types';
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

SecretPost.propTypes = {
  title: PropTypes.element,
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default SecretPost;
