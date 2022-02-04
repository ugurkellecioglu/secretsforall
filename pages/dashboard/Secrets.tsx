import { Avatar, Card, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import Secret from '../../components/Secret';
import SecretPost from '../../components/SecretPost';
import styles from './style.module.css';

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

function Secrets({ data, router }) {
  const handleOnClick = (_id) => {
    router.push(`/dashboard/secrets/${_id}`);
  };
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={12}>
          {data.length > 0 &&
            data.map(({ _id, user, title, text, updatedAt }) => (
              <SecretPost
                key={_id}
                text={text}
                title={<CardHeader updatedAt={updatedAt} secret={title} user={user} />}
                onClick={() => handleOnClick(_id)}
              />
            ))}
        </Col>
      </Row>
    </>
  );
}

export default Secrets;
