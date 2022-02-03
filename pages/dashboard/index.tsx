import { Card, Button, Col, Row, Input, Spin, Skeleton, Divider, Space } from 'antd';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import styles from './style.module.css';
import Avatar from 'antd/lib/avatar/avatar';
const { TextArea } = Input;
import Overlay from '../../components/Overlay';
import axios from 'axios';
import Message from '../../helpers/Message';
import reducer from '../../reducers/reducer';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import Meta from 'antd/lib/card/Meta';

const CardHeader = ({ secret, user }: any) => {
  // const user = getUserInfo(Number(secret.userId));
  return (
    <>
      <Row align="middle">
        <Avatar size="large" src={user?.profilePic} />
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
  const user = useContext(UserContext);
  const router = useRouter();
  const initialState = {
    loading: false,
    error: '',
    data: {
      _id: String,
      userId: Number,
      title: String,
      text: String
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPosts = async () => {
    dispatch({ type: 'loading' });
    try {
      const response = await axios.get('/api/secrets');
      const result = await response.data;
      dispatch({ type: 'success', payload: result });
      return result;
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  const [secretText, setSecretText] = useState('');
  interface SecretInterface {
    title: string;
    text: string;
    userId: number;
    createdAt?: string;
  }
  const handlePostSecret = async ({ title, text }: SecretInterface) => {
    const response = await axios.post('/api/secrets', { title, text, ...user });
    state.data.unshift({ title, text, ...user });
    if (response.status === 200) {
      Message('success', 'Successfully pushed secret', [2]);
    } else {
      Message('error', 'Could not pushed, please try again', [2]);
    }
    setSecretText('');
  };
  return (
    <Spin spinning={state.loading} delay={500} tip="Loading...">
      {state.loading ? (
        <>
          <Row justify="center" align="middle" style={{ paddingBottom: '30px' }}>
            <Col span={12}>
              <Skeleton.Input style={{ width: '50vw' }} active={true} size="large" />
            </Col>
          </Row>
          {[1, 2, 3].map((i: number) => (
            <>
              <Row style={{ paddingBottom: '50px' }} key={i} justify="center" align="middle">
                <Col span={12}>
                  <Skeleton active paragraph={{ rows: 4 }} />
                </Col>
              </Row>
              <Divider />
            </>
          ))}
        </>
      ) : (
        <>
          <Row justify="center" align="middle">
            <Col className={styles.ShareSecret} span={12}>
              <TextArea
                rows={4}
                allowClear={true}
                bordered={true}
                showCount={true}
                autoSize={{ minRows: 3, maxRows: 6 }}
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
                    userId: user._id
                  })
                }>
                Submit
              </Button>
            </Col>
          </Row>
          <Row
            style={{ padding: '0 4px', display: 'flex', flexWrap: 'wrap', height: '100%' }}
            gutter={4}
            justify="center">
            <Col className={styles.col} span={48}>
              {state.data.length > 0 &&
                state.data.map(({ _id, user, title, text }) => (
                  <Card
                    onClick={() => router.push(`/dashboard/secrets/${_id}`)}
                    key={user._id}
                    title={<CardHeader secret={title} user={user} />}
                    bordered={true}
                    hoverable={true}
                    style={{ marginBottom: '10px', width: '50vw' }}>
                    {text.substring(0, 100) + '...'}
                  </Card>
                ))}
            </Col>
          </Row>
        </>
      )}
    </Spin>
  );
};

function Index() {
  return <Overlay Content={Content}></Overlay>;
}

export default Index;
