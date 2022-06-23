import { Col, notification, Row, Spin } from 'antd';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import styles from './style.module.css';
import Overlay from '../../components/Overlay';
import axios from 'axios';
import reducer from '../../reducers/reducer';
import { UserContext } from '../../context/UserContext';
import ShareSecret from '../../components/Dashboard/ShareSecret/ShareSecret';
import Secrets from './Secrets';
import _Skeleton from './Skeleton';
import { DashboardProvider } from '../../context/DasboardContext';
const Content = () => {
  const user = useContext(UserContext);
  const initialState = {
    loading: false,
    error: '',
    data: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPosts = async () => {
    dispatch({ type: 'SECRETS_LOADING' });
    try {
      const response = await axios.get('/api/secrets');
      const result = await response.data;
      dispatch({ type: 'SECRETS_SUCCESS', payload: result });
      return result;
    } catch (error) {
      dispatch({ type: 'SECRETS_ERROR' });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const [secretText, setSecretText] = useState('');
  const handlePostSecret = async ({ title, text }) => {
    const response = await axios.post('/api/secrets', { title, text, ...user });
    if (state.data.length > 0) {
      state.data.unshift({ title, text, ...user, _id: response.data.result.insertedId });
    } else {
      state.data = [{ title, text, ...user }];
    }

    if (response.status === 200) {
      notification.success({
        message: 'Secret Posted',
        description: 'You have successfully posted a secret.',
        placement: 'topRight'
      });
    } else {
      notification.warning({
        message: 'Secret Post Error',
        description: 'There was an error posting your secret.',
        placement: 'topRight'
      });
    }
    setSecretText('');
  };

  return (
    <DashboardProvider
      setSecretText={setSecretText}
      secretText={secretText}
      handlePostSecret={handlePostSecret}
      >
      <Spin spinning={state.loading} delay={500} tip="Loading...">
        {state.loading ? (
          <_Skeleton />
        ) : (
          <>
            <Row style={{ paddingBottom: '30px' }} justify="center" align="middle">
              <Col className={styles.ShareSecret} span={12}>
                <ShareSecret />
              </Col>
            </Row>
            <Row justify="center" align="middle">
              <Col className={styles.col} span={12}>
                <Secrets data={state.data} />
              </Col>
            </Row>
          </>
        )}
      </Spin>
    </DashboardProvider>
  );
};

function Index() {
  return <Overlay Content={Content}></Overlay>;
}

export default Index;
