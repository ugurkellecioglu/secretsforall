import { Form, Button, Input } from 'antd';
import React from 'react';
const { TextArea } = Input;
import PropTypes from 'prop-types';
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        autoSize={{ minRows: 1, maxRows: 6 }}
        onChange={onChange}
        value={value}
        placeholder="What's on your mind?"
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

export default Editor;
