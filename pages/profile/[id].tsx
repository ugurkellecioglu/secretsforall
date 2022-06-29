import { Button, Tag } from 'antd';
// import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './index.module.scss';
import axios from '../../helpers/axios';
import jwt from 'jsonwebtoken';
import mongoDB from '../../helpers/MongoDB';
import { HeaderContext } from '../../context/HeaderContext';
import dynamic from 'next/dynamic';

const Secrets = dynamic(import('../../components/Dashboard/Secrets'));
const Overlay = dynamic(import('../../components/Overlay'));
const EditProfileModal = dynamic(import('../../components/Profile/EditProfileModal'));
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
            <div>
              {userTags.map((tag, idx) => (
                <Tag key={`${tag.text}-${idx}`} color={tag.color}>
                  {tag.text}
                </Tag>
              ))}
            </div>
          </div>
          {userCtx.user.username === data.username ? (
            <div className={styles.uploadACoverWrapper}>
              <label htmlFor="image" className={styles.uploadACover}>
                <div className="ant-btn ant-btn-primary">Upload a cover</div>
              </label>
              <input
                type="file"
                id="image"
                name="img"
                className={styles.addCoverPhoto}
                accept="image/*"
                onChange={(e) => onLoad(e)}
                style={{ display: 'none' }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.posts}>
        <Secrets data={data.posts} />
      </div>
    </Overlay>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const [collection, secretsCollection] = await Promise.all([
    mongoDB.getCollection('USERS'),
    mongoDB.getCollection('SECRETS')
  ]);
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
      try {
        const result = await secretsCollection.find({ 'user.username': id }).toArray();
        if (!result) return res.status(400).json({ Message: 'Secret not found.' });
        user.posts = result;
      } catch (error) {
        return {
          props: {
            data: {}
          }
        };
      }
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
