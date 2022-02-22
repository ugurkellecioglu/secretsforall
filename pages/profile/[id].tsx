import {
  DislikeFilled,
  DislikeTwoTone,
  LikeFilled,
  LikeOutlined,
  LikeTwoTone,
  NotificationFilled,
  NotificationTwoTone
} from '@ant-design/icons';
import { Card, Col, Divider, Row, Tag } from 'antd';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import React from 'react';
import Overlay from '../../components/Overlay';
import styles from './index.module.css';
const Content = () => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <div className={styles.cover}>
        <img
          className={styles.coverImg}
          src="https://images.unsplash.com/photo-1560931296-2dccce3dcf2d"></img>
        <div className={styles['profile-section']}>
          <div className={styles['profile-img']}>
            <img
              src="https://avatars.dicebear.com/api/avataaars/0npmkl.svg"
              style={{ objectFit: 'none' }}
            />
          </div>
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

      <Row align="middle" justify="center" style={{ marginTop: '10px', marginLeft: '190px' }}>
        <Col span={18}>
          <div>
            <Tag color="magenta">day dreamer</Tag>
            <Tag color="volcano">guitarist</Tag>
            <Tag color="gold">cat lover</Tag>
            <Tag color="geekblue">fascinated by stars</Tag>
          </div>
          <Row className={styles.feed} align="middle">
            <Col span={24} className={styles.stats}>
              <Row align="middle">
                <Col span={18}>
                  <Row gutter={24}>
                    <Col span={6}>
                      <Card size="small" className={[styles.card, styles.likeCard].join(' ')}>
                        <div>
                          <LikeTwoTone twoToneColor={'#52c41a'} style={{ fontSize: '32px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ margin: ' 0 0 0 15px' }}>
                            <b>3</b> likes
                          </h3>
                        </div>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card size="small" className={[styles.card, styles.dislikeCard].join(' ')}>
                        <div>
                          <DislikeTwoTone twoToneColor={'#ff4d4f'} style={{ fontSize: '32px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ margin: ' 0 0 0 15px' }}>
                            <b>13</b> dislikes
                          </h3>
                        </div>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card
                        size="small"
                        className={[styles.card, styles.lastActivityCard].join(' ')}>
                        <div>
                          <NotificationTwoTone
                            twoToneColor={'#ffb84d'}
                            style={{ fontSize: '32px' }}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h3 style={{ margin: ' 0 0 0 15px' }}>
                            <b>7</b> day ago
                          </h3>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

function Index() {
  return <Overlay Content={Content}></Overlay>;
}

export default Index;
