import { Button, Col, Row, Tag } from 'antd';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/UserContext';
import styles from './index.module.css';
import Secrets from '../dashboard/Secrets';
import { useRouter } from 'next/router';
import axios from '../../helpers/axios';

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

  const router = useRouter();
  useEffect(() => {
    const id = router.query.id;
    if (!id) return;
    axios.get('/api/user/' + id).then((res) => {
      console.log('res', res);
    });
  }, [router.query]);
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
        </Col>
      </Row>
      <Row>
        <Col className={styles.col} span={48}>
          <Secrets data={[]} />
        </Col>
      </Row>
    </>
  );
};

function Index() {
  return <Overlay Content={Content}></Overlay>;
}

export default Index;
