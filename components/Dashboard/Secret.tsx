import { Card } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function Secret({ text, title, postId }) {
  return (
    <>
      {text && title && (
        <Card title={title} bordered={false} hoverable={false}>
          <Link href={`/dashboard/secrets/${postId}`}>
            <span>{text.substring(0, 200)}</span>
          </Link>
        </Card>
      )}
    </>
  );
}

Secret.propTypes = {
  text: PropTypes.string,
  title: PropTypes.element,
  postId: PropTypes.string
};

export default Secret;
