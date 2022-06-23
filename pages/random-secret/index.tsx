import { Col, Row, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import Overlay from '../../components/Overlay';

function RandomSecret() {
  const getRandomSecret = async () => {
    try {
      const response = await axios.get('/api/secrets?type=random');
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomSecret();
  }, []);

  return (
    <Spin spinning={false}>
      <Row>
        <Col span={24}>
          <h1>Random Secret</h1>
        </Col>
      </Row>
    </Spin>
  );
}

function Index() {
  return <Overlay Content={RandomSecret} />;
}

export default Index;
