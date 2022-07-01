import { Col, Row } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { PostProvider } from '../../context/PostContext';
import dynamic from 'next/dynamic';

const CardHeader = dynamic(import('../../components/CardHeader.tsx'));
const SecretPost = dynamic(import('./SecretPost'));

function Secrets({ data }) {
  return (
    <PostProvider>
      <Row justify="center" align="middle">
        <Col lg={12} md={18} sm={24} xs={24}>
          {data &&
            data.map(({ _id, user, text, updatedAt, comments }) => (
              <SecretPost
                key={_id}
                postId={_id}
                text={text}
                comments={comments}
                title={<CardHeader updatedAt={updatedAt} user={user} />}
              />
            ))}
        </Col>
      </Row>
    </PostProvider>
  );
}

Secrets.propTypes = {
  data: PropTypes.array
};
Secrets.defaultProps = {
  data: []
};

export default Secrets;
