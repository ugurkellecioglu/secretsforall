import { Card } from 'antd';
import React from 'react';

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

export default Secret;
