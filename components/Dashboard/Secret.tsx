import { Card } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function Secret({ text: textProps, title, postId }) {
  const [text, setText] = useState(textProps);
  const Title = React.cloneElement(title, {
    setText: setText
  });

  return (
    <>
      {text && title && (
        <Card title={Title} bordered={false} hoverable={false}>
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
