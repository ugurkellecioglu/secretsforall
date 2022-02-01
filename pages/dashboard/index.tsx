import { Card, Button, Col, Row, Input, Spin } from 'antd';
import React, { useState } from 'react';
import styles from './style.module.css';
import secrets from '../../secrets.js';
import Avatar from 'antd/lib/avatar/avatar';
const { TextArea } = Input;
import users from '../../users.js';
import Overlay from '../../components/Overlay';
import axios from 'axios';
import Message from '../../helpers/Message';

const getUserInfo = (userId: Number) => {
  const user = users.find((user) => user.userId === userId);
  return user;
};

const CardHeader = ({ secret }: any) => {
  const user = getUserInfo(Number(secret.userId));
  return (
    <>
      <Row align="middle">
        <Avatar size="large" src={user.profilePic || ''} />
        <div>
          <span className={styles.username}>{user.username}</span>
          <p style={{ fontSize: '9px', color: 'gray', fontWeight: 'lighter' }}>
            {secret.createdAt}
          </p>
        </div>
      </Row>
    </>
  );
};

const Content = () => {
  const [secretText, setSecretText] = useState('');
  interface SecretInterface {
    title: string;
    text: string;
    userId: number;
    createdAt?: string;
  }
  const [loading, setLoading] = useState(false);
  const handlePostSecret = async ({ title, text, userId }: SecretInterface) => {
    setLoading(true);
    const response = await axios.post('/api/secrets', { title, text, userId });
    const result = await response.data;
    if (result.status === 200) {
      Message('success', 'Successfully pushed secret');
    } else {
      Message('error', 'Could not pushed, please try again');
    }
    setLoading(false);
  };
  return (
    <Spin spinning={loading} delay={500} tip="Loading...">
      <Row justify="center" align="middle">
        <Col className={styles.ShareSecret} span={12}>
          <TextArea
            rows={4}
            allowClear={true}
            bordered={true}
            showCount={true}
            autoSize={{ minRows: 3, maxRows: 6 }}
            maxLength={300}
            placeholder="Share your secret..."
            value={secretText}
            onChange={(e) => setSecretText(e.target.value)}
          />
          <Button
            type="primary"
            onClick={() =>
              handlePostSecret({
                title: secretText.substring(0, 10),
                text: secretText,
                userId: 1
              })
            }
          >
            Submit
          </Button>
        </Col>
      </Row>
      <Row
        style={{ padding: '0 4px', display: 'flex', flexWrap: 'wrap' }}
        gutter={4}
        justify="center"
      >
        <Col className={styles.col} span={48}>
          {secrets.map((secret) => (
            <Card
              key={secret.secretId}
              title={<CardHeader secret={secret} />}
              bordered={true}
              hoverable={true}
              style={{ marginBottom: '10px', width: '50vw' }}
            >
              {secret.secretText + '...'}
            </Card>
          ))}
        </Col>
      </Row>
    </Spin>
  );
};

function index() {
  return <Overlay Content={Content}></Overlay>;
}

export default index;
