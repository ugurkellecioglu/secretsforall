import React, { useContext, useReducer } from 'react';
import { Spin, Layout, notification } from 'antd';
import axios from 'axios';
import reducer from '../../reducers/reducer';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import LoginForm from './LoginForm';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Ellipse from './assets/ellipse.png';
import Layer1 from './assets/Layer1.png';
import Layer2 from './assets/Layer2.png';
import Plus from './assets/plus.png';
import Triangle from './assets/triangle.png';
import { Typography } from 'antd';
import styles from './Login.module.scss';
const { Title } = Typography;
function Index() {
  const initialState = {
    loading: false,
    error: '',
    data: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const handleLogin = async (form: Object) => {
    dispatch({ type: 'LOGIN_LOADING' });
    try {
      const response = await axios.post('/api/authorize', form);
      const result = await response.data;
      dispatch({ type: 'LOGIN_SUCCESS', payload: result });

      notification.success({
        message: 'Login Success',
        description: 'You have successfully logged in.',
        placement: 'topRight'
      });

      const d = new Date();
      d.setTime(d.getTime() + response.data.expires_in * 60 * 1000);
      Cookies.set('jwtToken', response.data.jwtToken, {
        path: '/',
        expires: d
      });
      axios.defaults.headers.common['Authorization'] = response.data.jwtToken;
      axios
        .get('/api/user', {
          headers: {
            Authorization: `Bearer ${response.data.jwtToken}`
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
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.error });
      notification.warning({
        message: 'Login Error',
        description: 'Invalid username or password.',
        placement: 'topRight'
      });
    }
  };

  const { setUser } = useContext(UserContext);

  return (
    <Spin spinning={state.loading}>
      <Layout
        style={{
          width: '%100',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div
          style={{
            width: '100vw',
            height: '100%',
            backgroundColor: '#f64747',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            boxShadow: '1px -5px 300px #000000'
          }}
          className={styles.wrapper}
        >
          <div className="content" style={{ zIndex: '5' }}>
            <Title style={{ color: 'white' }} level={1}>
              Welcome back.
            </Title>

            <Typography.Text style={{ color: 'white', fontSize: '20px', fontWeight: 'lighter' }}>
              You can sign in to access with your existing account.
            </Typography.Text>
          </div>
          <div className="images" style={{ zIndex: '1' }}>
            <div
              style={{ position: 'absolute', left: '10%', top: '10%', width: '4%', zIndex: '9' }}
            >
              <Image src={Plus} alt="Layer1" />
            </div>
            <div
              style={{ position: 'absolute', left: '50%', top: '40%', width: '3%', zIndex: '9' }}
            >
              <Image src={Plus} alt="Layer1" />
            </div>
            <div
              style={{ position: 'absolute', left: '30%', top: '15%', width: '3%', zIndex: '9' }}
            >
              <Image src={Ellipse} alt="Layer1" />
            </div>
            <div
              style={{ position: 'absolute', left: '80%', top: '90%', width: '5%', zIndex: '9' }}
            >
              <Image src={Ellipse} alt="Layer1" />
            </div>

            <div
              style={{ position: 'absolute', left: '28%', top: '67%', width: '4%', zIndex: '9' }}
            >
              <Image src={Triangle} alt="Layer1" />
            </div>
            <div
              style={{ position: 'absolute', left: '68%', top: '48%', width: '2%', zIndex: '9' }}
            >
              <Image src={Triangle} alt="Layer1" />
            </div>
            <div style={{ position: 'absolute', left: '0', bottom: '0', width: '80%' }}>
              <Image src={Layer1} objectPosition="left bottom" />
            </div>
            <div style={{ position: 'absolute', left: '0', bottom: '0', width: '80%' }}>
              <Image src={Layer2} objectPosition="left bottom" />
            </div>
          </div>
        </div>

        <div className={styles['right-side']}>
          <LoginForm
            handleLogin={handleLogin}
            cardStyles={{
              width: '70%',
              height: '70%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        </div>
      </Layout>
    </Spin>
  );
}

export default Index;
