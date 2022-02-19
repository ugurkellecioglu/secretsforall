import { Button, Input } from 'antd';
import React from 'react';
const { TextArea } = Input;
import PropTypes from 'prop-types';

function ShareSecret({ secretText, setSecretText, handlePostSecret }) {
  return (
    <>
      <TextArea
        rows={4}
        allowClear={true}
        bordered={true}
        showCount={true}
        autoSize={{ minRows: 3, maxRows: 6 }}
        placeholder="Share your secret..."
        value={secretText}
        onChange={(e) => setSecretText(e.target.value)}
      />
      <Button
        type="primary"
        onClick={() =>
          handlePostSecret({
            title: secretText.substring(0, 25),
            text: secretText
          })
        }
      >
        Submit
      </Button>
    </>
  );
}

ShareSecret.propTypes = {
  secretText: PropTypes.string,
  setSecretText: PropTypes.func,
  handlePostSecret: PropTypes.func
};

export default React.memo(ShareSecret);
