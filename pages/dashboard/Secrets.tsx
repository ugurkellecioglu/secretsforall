import { Avatar, Col, Row } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import SecretPost from './SecretPost';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { PostContext } from '../../context/PostContext';
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

function Secrets({ user, data, router }) {
  const handleOnClick = (_id) => {
    router.push(`/dashboard/secrets/${_id}`);
  };
  const [comment, setComment] = useState('');
  const handleReply = async () => console.log('we are replying now');

  return (
    <PostContext.Provider value={{ comment, setComment, handleReply }}>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col span={6} />
        <Col span={12}>
          {data &&
            data.length > 0 &&
            data.map(({ _id, user, title, text, updatedAt, comments }) => (
              <>
                <SecretPost
                  key={_id}
                  postId={_id}
                  text={text}
                  comments={comments}
                  title={<CardHeader updatedAt={updatedAt} user={user} />}
                  onClick={() => handleOnClick(_id)}
                />
              </>
            ))}
        </Col>
        <Col span={6} />
      </Row>
    </PostContext.Provider>
  );
}

Secrets.propTypes = {
  user: PropTypes.object,
  data: PropTypes.array,
  router: PropTypes.object
};
export default Secrets;
