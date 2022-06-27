import { Col, notification, Row, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import Overlay from '../../components/Overlay';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { DashboardProvider } from '../../context/DasboardContext';
import dynamic from 'next/dynamic';

const ShareSecret = dynamic(import('../../components/Dashboard/ShareSecret/ShareSecret'));
const Secrets = dynamic(import('../../components/Dashboard/Secrets'));
const _Skeleton = dynamic(import('../../components/Dashboard/Skeleton'));

const Index: React.FC<any> = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [secretText, setSecretText] = useState('');
  const [data, setData] = useState([]);

  const handlePostSecret = async ({ title, text }) => {
    const response = await axios.post('/api/secrets', { title, text, ...user });
    if (data.length > 0) {
      data.unshift({ title, text, ...user, _id: response.data.result.insertedId });
    } else {
      setData([{ title, text, ...user }]);
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
  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/secrets');
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <DashboardProvider
      setSecretText={setSecretText}
      secretText={secretText}
      handlePostSecret={handlePostSecret}>
      <Overlay>
        <Spin spinning={loading} delay={500} tip="Loading...">
          {loading ? (
            <_Skeleton />
          ) : (
            <>
              <Row style={{ paddingBottom: '30px' }} justify="center" align="middle">
                <Col className={styles.ShareSecret} md={12} span={24}>
                  <ShareSecret />
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col className={styles.col} span={24}>
                  <Secrets data={data} />
                </Col>
              </Row>
            </>
          )}
        </Spin>
      </Overlay>
    </DashboardProvider>
  );
};

export default Index;
