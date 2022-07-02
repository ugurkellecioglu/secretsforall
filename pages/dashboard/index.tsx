import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../../helpers/axios';
import { Col, notification, Row, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/UserContext';
import { DashboardProvider } from '../../context/DasboardContext';
import dynamic from 'next/dynamic';

const ShareSecret = dynamic(import('../../components/Dashboard/ShareSecret/ShareSecret'));
const Secrets = dynamic(import('../../components/Dashboard/Secrets'));
const _Skeleton = dynamic(import('../../components/Dashboard/Skeleton'));

const Index: React.FC<any> = () => {
  const user = useContext(UserContext);
  const [secretText, setSecretText] = useState('');
  const [loading, setLoading] = useState(false);
  const [infiniteLoadig, setInfiniteLoading] = useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const fetchMoreData = async () => {
    setInfiniteLoading(true);
    const response = await axios.get(`/api/secrets?size=10&page=${page}`);
    if (response.status === 200) {
      setData(data.concat(response.data));
      setPage((prev) => prev + 1);
    }
    setInfiniteLoading(false);
    setLoading(false);
  };

  const handlePostSecret = async ({ title, text }) => {
    const response = await axios.post('/api/secrets', { title, text, ...user });
    if (data.length > 0) {
      data.unshift({ title, text, ...user, _id: response.data.result.insertedId });
    } else {
      setData([{ title, text, ...user, _id: response.data.result.insertedId }]);
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

  useEffect(() => {
    setLoading(true);
    fetchMoreData();
  }, []);

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
                <Col className={styles.ShareSecret} lg={12} md={18} sm={24} xs={24}>
                  <ShareSecret />
                </Col>
              </Row>
              <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<Spin spinning={infiniteLoadig} delay={100} tip="Loading..." />}
              >
                <Secrets data={data} />
              </InfiniteScroll>
            </>
          )}
        </Spin>
      </Overlay>
    </DashboardProvider>
  );
};

export default Index;
