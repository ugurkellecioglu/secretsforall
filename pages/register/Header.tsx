import { Col, Typography } from 'antd';
import React from 'react';

function Header() {
  return (
    <>
      <Col span={24}>
        <Typography.Title level={1}>Sign Up</Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Text>Register and start sharing your secrets with everyone.</Typography.Text>
      </Col>
    </>
  );
}

export default Header;
