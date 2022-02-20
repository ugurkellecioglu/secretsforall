import { Form, Button, Input } from 'antd';
import React from 'react';
const { TextArea } = Input;
import PropTypes from 'prop-types';
const Editor = ({ onChange, onSubmit, submitting, value, maxRow }) => (
  <>
    <Form.Item>
      <TextArea rows={maxRow} onChange={onChange} value={value} />
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
  value: PropTypes.string.isRequired,
  maxRow: PropTypes.number
};

Editor.defaultProps = {
  maxRow: 4
};
export default Editor;
