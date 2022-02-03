import { Col, Row, Spin, Skeleton, Divider } from 'antd';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import styles from './style.module.css';
import Overlay from '../../components/Overlay';
import axios from 'axios';
import Message from '../../helpers/Message';
import reducer from '../../reducers/reducer';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import ShareSecret from './ShareSecret';
import Secrets from './Secrets';
import _Skeleton from './Skeleton';

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
        <_Skeleton />
      ) : (
        <>
          <Row style={{ paddingBottom: '30px' }} justify="center" align="middle">
            <Col className={styles.ShareSecret} span={12}>
              <ShareSecret
                setSecretText={setSecretText}
                secretText={secretText}
                handlePostSecret={handlePostSecret}
              />
            </Col>
          </Row>
          <Row
            style={{ padding: '0 4px', display: 'flex', flexWrap: 'wrap', height: '100%' }}
            gutter={4}
            justify="center">
            <Col className={styles.col} span={48}>
              <Secrets data={state.data} router={router} />
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
