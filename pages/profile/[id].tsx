import { Button, Spin, Tag } from 'antd';
// import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './index.module.scss';
import axios from '../../helpers/axios';
import { HeaderContext } from '../../context/HeaderContext';
import dynamic from 'next/dynamic';
import useDeviceDetect from '../../helpers/useDeviceDetect';
import { CameraFilled } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';

const Secrets = dynamic(import('../../components/Dashboard/Secrets'));
const Overlay = dynamic(import('../../components/Overlay'));
const EditProfileModal = dynamic(import('../../components/Profile/EditProfileModal'));
const Index: React.FC<any> = () => {
  const { isMobile } = useDeviceDetect();

  const userCtx = useContext(UserContext);
  const { setCollapsed } = useContext(HeaderContext);
  const [image, setImage] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [userTags, setUserTags] = useState([]);
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [infiniteLoadig, setInfiniteLoading] = useState(false);
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [user, setUser] = useState(null);
  const fetchMoreData = async () => {
    setInfiniteLoading(true);
    const response = await axios.get(
      `/api/secrets?username=${route.query.id}&size=10&page=${page}`
    );
    if (response.status === 200) {
      setData(data.concat(response.data));
      setPage((prev) => prev + 1);
    }
    setInfiniteLoading(false);
    setLoading(false);
  };

  const getUserInfo = async () => {
    const response = await axios.get(`/api/user?id=${route.query.id}`);
    if (response.status === 200) {
      setUser(response.data);
      setUserTags(response.data.tags);
    }
  };

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
    setLoading(true);
    if (!route.query.id) return;
    setCollapsed(true);
    getUserInfo();
    fetchMoreData();
  }, [route.query]);

  return (
    <Overlay>
      <Spin spinning={loading} delay={500} size="large">
        <div className={styles.cover}>
          <div className={styles.coverWrapperImage}>
            <img className={styles.coverImg} src={image || user?.cover || ''} />
          </div>
          <div className={styles['profile-section']}>
            <div className={styles['profile-img']}>
              <img src={user?.profilePic || ''} style={{ objectFit: 'none' }} />
            </div>
            <div className={styles['profile-infos']}>
              <h1 className={styles['profile-fullname']}>{user?.username}</h1>
              {userCtx.user.username === user?.username ? (
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
                <span>
                  {userCtx.user.username === user?.username ? userCtx.user.info : user?.info}
                </span>
              </div>
              <div>
                {userTags.map((tag, idx) => (
                  <Tag key={`${tag.text}-${idx}`} color={tag.color}>
                    {tag.text}
                  </Tag>
                ))}
              </div>
            </div>
            {userCtx.user.username === user?.username ? (
              <div
                className={
                  !isMobile ? styles.uploadACoverWrapper : styles.uploadACoverWrapperMobile
                }
              >
                <label htmlFor="image" className={styles.uploadACover}>
                  {!isMobile ? (
                    <div className="ant-btn ant-btn-primary">Upload a cover</div>
                  ) : (
                    <CameraFilled style={{ fontSize: '20px' }} />
                  )}
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
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<Spin spinning={infiniteLoadig} delay={100} tip="Loading..." />}
          >
            <Secrets data={data} />
          </InfiniteScroll>
        </div>
      </Spin>
    </Overlay>
  );
};

export default Index;
