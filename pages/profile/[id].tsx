import { Button, Col, Row, Tag } from 'antd';
// import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Overlay from '../../components/Overlay';
import { UserContext } from '../../context/UserContext';
import styles from './index.module.css';
import Secrets from '../dashboard/Secrets';
import axios from '../../helpers/axios';
import jwt from 'jsonwebtoken';
import mongoDB from '../../helpers/MongoDB';
import EditProfileModal from './EditProfileModal';
import { HeaderContext } from '../../context/HeaderContext';
const Index: React.FC<any> = ({ data }) => {
  const userCtx = useContext(UserContext);
  const { setCollapsed } = useContext(HeaderContext);
  const [image, setImage] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [userTags, setUserTags] = useState(data.tags || []);
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

  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <Overlay>
      <div className={styles.cover}>
        <div className={styles.coverWrapperImage}>
          <img className={styles.coverImg} src={image || data.cover} />
          {userCtx.user.username === data.username ? (
            <div>
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
          ) : null}
        </div>
        <div className={styles['profile-section']}>
          <div className={styles['profile-img']}>
            <img src={data?.profilePic || ''} style={{ objectFit: 'none' }} />
          </div>
          <div className={styles['profile-infos']}>
            <h1 className={styles['profile-fullname']}>{data?.username}</h1>
            {userCtx.user.username === data.username ? (
              <Button
                type="primary"
                onClick={() => setShowEditProfileModal(true)}
                shape="round"
                className={styles['profile-edit-btn']}
              >
                Edit Profile
              </Button>
            ) : null}
            <EditProfileModal
              userTags={userTags}
              setUserTags={setUserTags}
              show={showEditProfileModal}
              setShow={setShowEditProfileModal}
            />
            <div className={styles['profile-info']}>
              <span>{userCtx.user.username === data.username ? userCtx.user.info : data.info}</span>
            </div>
          </div>
        </div>
      </div>

      <Row align="middle" justify="center" style={{ marginTop: '10px', marginLeft: '190px' }}>
        <Col span={18}>
          <div className={styles.tagWrapper}>
            {userTags.map((tag, idx) => (
              <Tag key={`${tag.text}-${idx}`} color={tag.color}>
                {tag.text}
              </Tag>
            ))}
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

export async function getServerSideProps({ query, req, res }) {
  const db = await mongoDB.getDB(mongoDB.dbNames.SECRETSFORALL);
  const collection = db.collection(mongoDB.collections.USERS);
  const { id } = query;
  const token = req.cookies.jwtToken;
  if (!token) {
    return {
      props: {
        data: {}
      }
    };
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  if (!decoded) {
    return {
      props: {
        data: {}
      }
    };
  }
  if (id) {
    try {
      const result = await collection.findOne({ username: id });
      // eslint-disable-next-line no-unused-vars
      const { password, ...user } = result;
      return {
        props: {
          data: JSON.parse(JSON.stringify({ ...user }))
        }
      };
    } catch (error) {
      return { props: { data: {} } };
    }
  }
  return res.status(500).json({ error: 'Missing id' });
}
export default Index;
