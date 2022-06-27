import { Col, notification, Row, Spin } from 'antd';
import React, { useContext, useState } from 'react';
import styles from './style.module.css';
import Overlay from '../../components/Overlay';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { DashboardProvider } from '../../context/DasboardContext';
import mongoDB from '../../helpers/MongoDB';
import dynamic from 'next/dynamic';

const ShareSecret = dynamic(import('../../components/Dashboard/ShareSecret/ShareSecret'));
const Secrets = dynamic(import('../../components/Dashboard/Secrets'));
const _Skeleton = dynamic(import('../../components/Dashboard/Skeleton'));
const Index: React.FC<any> = ({ data }) => {
  const user = useContext(UserContext);
  const loading = false;
  const [secretText, setSecretText] = useState('');
  const handlePostSecret = async ({ title, text }) => {
    const response = await axios.post('/api/secrets', { title, text, ...user });
    if (data.length > 0) {
      data.unshift({ title, text, ...user, _id: response.data.result.insertedId });
    } else {
      data = [{ title, text, ...user }];
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

export async function getServerSideProps({ req, res }) {
  const db = await mongoDB.getDB(mongoDB.dbNames.SECRETSFORALL);
  const secretsCollection = await db.collection('secrets');
  const secrets = await secretsCollection.find({}).sort({ updatedAt: -1 }).toArray();

  const usersCollection = await db.collection('users');
  const users = await usersCollection.find({}).toArray();
  secrets.forEach((secret) => {
    const secretComments = secret.comments.map((comment) => {
      const commented = users.find((user) => user._id.toString() === comment.userId.toString());
      if (commented) {
        const { profilePic, username } = commented;
        return { ...comment, profilePic, username };
      }
    });
    secret.comments = secretComments;
  });
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  return {
    props: {
      data: JSON.parse(JSON.stringify(secrets))
    }
  };
}

export default Index;
