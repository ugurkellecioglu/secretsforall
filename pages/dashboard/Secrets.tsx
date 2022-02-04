import { Avatar, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import SecretPost from '../../components/SecretPost';
import styles from './style.module.css';
import PropTypes from 'prop-types';
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

function Secrets({ data, router }) {
  const handleOnClick = (_id) => {
    router.push(`/dashboard/secrets/${_id}`);
  };
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={12}>
          {data &&
            data.length > 0 &&
            data.map(({ _id, user, title, text, updatedAt }) => (
              <SecretPost
                key={_id}
                text={text}
                title={<CardHeader updatedAt={updatedAt} user={user} />}
                onClick={() => handleOnClick(_id)}
              />
            ))}
        </Col>
      </Row>
    </>
  );
}

Secrets.propTypes = {
  data: PropTypes.array,
  router: PropTypes.object
};
export default Secrets;
