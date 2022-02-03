import { Col, Divider, Row, Skeleton } from 'antd';
import React from 'react';

function _Skeleton() {
  return (
    <>
      <Row justify="center" align="middle" style={{ paddingBottom: '30px' }}>
        <Col span={12}>
          <Skeleton.Input style={{ width: '50vw' }} active={true} size="large" />
        </Col>
      </Row>
      {[1, 2, 3].map((i: number) => (
        <div key={i}>
          <Row style={{ paddingBottom: '50px' }} key={i} justify="center" align="middle">
            <Col span={12}>
              <Skeleton active paragraph={{ rows: 4 }} />
            </Col>
          </Row>
          <Divider />
        </div>
      ))}
    </>
  );
}

export default _Skeleton;
