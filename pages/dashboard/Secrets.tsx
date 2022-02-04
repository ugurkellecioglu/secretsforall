import { Avatar, Card, Row } from 'antd';
import moment from 'moment';
import React from 'react';
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
  return (
    <>
      {data.length > 0 &&
        data.map(({ _id, user, title, text, updatedAt }) => (
          <Card
            onClick={() => router.push(`/dashboard/secrets/${_id}`)}
            key={_id}
            title={<CardHeader updatedAt={updatedAt} secret={title} user={user} />}
            bordered={true}
            hoverable={true}
            style={{ marginBottom: '10px', width: '50vw' }}
          >
            {text.substring(0, 200) + '...'}
          </Card>
        ))}
    </>
  );
}

export default Secrets;
