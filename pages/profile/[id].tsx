import { DislikeFilled, LikeFilled, NotificationFilled } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './index.module.css';
const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className={styles.cover}>
        <div className={styles['profile-section']}>
          <div className={styles['profile-img']}></div>
          <div className={styles['profile-infos']}>
            <h1 className={styles['profile-fullname']}>admin</h1>
            <div className={styles['profile-info']}>
              <span>
                Just one guy who are thrilled for the idea of being an secret keeper for everyone
              </span>
            </div>
          </div>
        </div>
      </div>
      <Row className={styles.feed} align="middle">
        <Col span={24} className={styles.stats}>
          <Row align="middle">
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <Card>
                    <LikeFilled />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <DislikeFilled />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <NotificationFilled />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Index;
