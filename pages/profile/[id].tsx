import { DislikeTwoTone, LikeTwoTone, NotificationTwoTone } from '@ant-design/icons';
import { Button, Card, Col, Row, Tag } from 'antd';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/router';
import React from 'react';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/UserContext';
import styles from './index.module.css';

const Content = () => {
  const userCtx = React.useContext(UserContext);

  const uploadPhotoProps = {
    name: 'files',
    accept: 'image/*',
    action: 'http://localhost:3000/api/user',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      console.log('info', info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: { strokeWidth: 2, showInfo: true }
  };
  return (
    <>
      <div className={styles.cover}>
        <div className={styles.coverWrapperImage}>
          <div className={styles.cutImage}></div>
          <div></div>

          <img
            className={styles.coverImg}
            src="https://images.unsplash.com/photo-1560931296-2dccce3dcf2d"
          />
          <Upload className={styles.addCoverPhoto} {...uploadPhotoProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
        <div className={styles['profile-section']}>
          <div className={styles['profile-img']}>
            <img src={userCtx.user.profilePic} style={{ objectFit: 'none' }} />
          </div>
          <div className={styles['profile-infos']}>
            <h1 className={styles['profile-fullname']}>{userCtx?.user?.username}</h1>
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
                        className={[styles.card, styles.lastActivityCard].join(' ')}
                      >
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
