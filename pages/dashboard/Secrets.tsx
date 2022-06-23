import { Avatar, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import SecretPost from './SecretPost';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { PostProvider } from '../../context/PostContext';
import { useRouter } from 'next/router';
const CardHeader = ({ updatedAt, user }: any) => {
  return (
    <>
      <Row align="middle">
        <Avatar size="large" src={user?.profilePic} />
        <div>
          <span className={styles.username}>{user.username}</span>

          <p style={{ fontSize: '9px', color: 'gray', fontWeight: 'lighter' }}>
            {moment(updatedAt).fromNow()}
          </p>
        </div>
      </Row>
    </>
  );
};

CardHeader.propTypes = {
  updatedAt: PropTypes.string,
  user: PropTypes.object
};

function Secrets({ data }) {
  const router = useRouter();

  const handleOnClick = (_id) => {
    router.push(`/dashboard/secrets/${_id}`);
  };

  return (
    <PostProvider>
      <Row justify="center" align="middle">
        <Col span={24}>
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
