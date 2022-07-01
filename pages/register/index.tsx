import { Spin, Card, Layout, Row, Space, Col, notification } from 'antd';
import { useContext, useReducer, useState } from 'react';
import axios from 'axios';
import styles from './style.module.scss';
import useAvatar from '../../helpers/useAvatar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import reducer from '../../reducers/reducer';
import Cookies from 'js-cookie';
import { UserContext } from '../../context/UserContext';
import dynamic from 'next/dynamic';
import Vector from '../../public/Speech bubbles-bro.svg';
const Header = dynamic(import('../../components/Register/Header'));
const Avatar = dynamic(() => import('../../components/Register/Avatar'));
const AvatarController = dynamic(() => import('../../components/Register/AvatarController'));
const RegisterForm = dynamic(() => import('../../components/Register/RegisterForm'));

const Home = () => {
  const [avatar, changeAvatar] = useAvatar();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const router = useRouter();

  const initialState = {
    loading: false,
    error: '',
    data: {}
  };
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setUser } = useContext(UserContext);

  const handleRegister = async (form: Object) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/register', form);
      await response.data;
      dispatch({ type: 'LOGIN_LOADING' });
      const login = await axios.post('/api/authorize', form);
      const result = await login.data;
      dispatch({ type: 'LOGIN_SUCCESS', payload: result });
      const d = new Date();
      d.setTime(d.getTime() + result.expires_in * 60 * 1000);
      Cookies.set('jwtToken', result.jwtToken, {
        path: '/',
        expires: d
      });
      axios.defaults.headers.common['Authorization'] = result.jwtToken;
      axios
        .get('/api/user', {
          headers: {
            Authorization: `Bearer ${result.jwtToken}`
          }
        })
        .then((res) => {
          setUser(res.data);
          dispatch({ type: 'USER_SUCCESS', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'USER_ERROR', payload: err.response.data });
        });
      router.push('/dashboard');
      notification.success({
        message: 'Registration Successful',
        description:
          'You have successfully registered. You will redirect to dashboard in a few seconds.',
        placement: 'topRight'
      });
      router.push('/dashboard');
    } catch (error) {
      console.log('error', error);
      notification.warning({
        message: 'Registration Error',
        description: 'There was an error registering your account.',
        placement: 'topRight'
      });
    }
    setLoading(false);
  };

  function handleAvatarChange(): void {
    setAvatarLoading(true);
    setTimeout(() => {
      changeAvatar();
      setAvatarLoading(false);
    }, 500);
  }

  return (
    <Layout style={{ width: '%100', height: '100vh' }}>
      <Spin spinning={loading} delay={500} tip="Loading...">
        <Row justify="center" align="middle">
          <Col md={9}>
            <Card style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
              <Space direction="vertical" size="large">
                <Row style={{ textAlign: 'center' }}>
                  <Header />
                </Row>
                <Row align="middle" justify="center">
                  <Avatar avatar={avatar} avatarLoading={avatarLoading} />
                </Row>
                <Row justify="center">
                  <AvatarController handleAvatarChange={handleAvatarChange} />
                </Row>
                <Row justify="center">
                  <RegisterForm
                    handleRegister={(form) =>
                      handleRegister({ ...form, profilePic: avatar, tags: [] })
                    }
                  />
                </Row>
              </Space>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={24} className={styles.image}>
            <Image src={Vector} alt="Group of People Image" />
          </Col>
        </Row>
      </Spin>
    </Layout>
  );
};

export default Home;
