import { Col, Row, Spin } from 'antd';
import React from 'react';
import Overlay from '../../components/Overlay';

function RandomSecret() {
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
