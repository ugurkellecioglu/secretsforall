import { Col, Row } from 'antd';
import React from 'react';
import SecretPost from './SecretPost';
import PropTypes from 'prop-types';
import { PostProvider } from '../../context/PostContext';
import { useRouter } from 'next/router';
import CardHeader from '../../components/CardHeader.tsx';

function Secrets({ data }) {
  const router = useRouter();

  const handleOnClick = (_id) => {
    router.push(`/dashboard/secrets/${_id}`);
  };

  return (
    <PostProvider>
      <Row justify="center" align="middle">
        <Col sm={12} xs={24}>
          {data &&
            data.map(({ _id, user, text, updatedAt, comments }) => (
              <SecretPost
                key={_id}
                postId={_id}
                text={text}
                comments={comments}
                title={<CardHeader updatedAt={updatedAt} user={user} />}
                onClick={() => handleOnClick(_id)}
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
