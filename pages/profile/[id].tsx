import { Col, Row, Tag } from 'antd';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/UserContext';
import styles from './index.module.css';
import Secrets from '../dashboard/Secrets';
import { useRouter } from 'next/router';
import axios from '../../helpers/axios';

const Index = () => {
  const userCtx = React.useContext(UserContext);
  const [image, setImage] = useState(null);
  const onLoad = (event) => {
    const element = event.target;
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (!image) return;
    axios
      .put(`/api/user/${userCtx.user.username}`, {
        cover: image,
        username: userCtx.user.username
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [image]);

  const router = useRouter();
  useEffect(() => {
    const id = router.query.id;
    if (!id) return;
    axios.get('/api/user/' + id).then((res) => {
      console.log('res', res);
    });
  }, [router.query]);
  return (
    <Overlay>
      <div className={styles.cover}>
        <div className={styles.coverWrapperImage}>
          <div className={styles.cutImage}></div>
          <img className={styles.coverImg} src={image || userCtx.user.cover} />
          <label htmlFor="img">Select image:</label>
          <input
            type="file"
            id="image"
            name="img"
            className={styles.addCoverPhoto}
            accept="image/*"
            onChange={(e) => onLoad(e)}
          />
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
    </Overlay>
  );
};

export default Index;
