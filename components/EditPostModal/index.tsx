import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import propTypes from 'prop-types';

const Index = ({
  isModalVisible,
  handleOk,
  handleCancel,
  user,
  text: textProp,
  postId,
  updatedAt
}) => {
  const [text, setText] = useState(textProp);
  useEffect(() => {
    setText(textProp);
  }, [textProp]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Modal
      title="Edit post"
      visible={isModalVisible}
      onOk={() => handleOk({ postId, text, user })}
      onCancel={handleCancel}
    >
      <Input.TextArea allowClear showCount value={text} onChange={handleChange} />
    </Modal>
  );
};

Index.propTypes = {
  isModalVisible: propTypes.bool,
  handleOk: propTypes.func,
  handleCancel: propTypes.func,
  user: propTypes.object,
  text: propTypes.string,
  postId: propTypes.string,
  updatedAt: propTypes.string
};

export default Index;
