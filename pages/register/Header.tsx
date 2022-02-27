import { Col, Typography, Card } from 'antd';
import {RightSquareFilled } from '@ant-design/icons';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.css';


function Header() {
  
  const router = useRouter();

  return (
    <>
      <div className={styles.loginIconWrapper}>
        <div className={styles.loginIcon}>
          <RightSquareFilled
            className={styles.loginIconComponent}
            onClick={() => router.push('/login')}
          />
          <div className={styles.loginLabel}>
            <span className={styles.loginLabelSpan}>Login</span>
          </div>
        </div>
      </div>
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
