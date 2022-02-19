import { Card } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

function Secret({ text, title, onClick }) {
  return (
    <>
      {text && title && (
        <Card title={title} onClick={onClick} bordered={false} hoverable={false}>
          {text.substring(0, 200) + '...'}
        </Card>
      )}
    </>
  );
}

Secret.propTypes = {
  text: PropTypes.string,
  title: PropTypes.element,
  onClick: PropTypes.func
};

export default Secret;
