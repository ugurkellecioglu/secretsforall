import React, { useContext, useReducer } from 'react';
import { Spin, Layout, message } from 'antd';
import axios from 'axios';
import reducer from '../../reducers/reducer';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';
import LoginForm from './LoginForm';
import Cookies from 'js-cookie';

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
      message.success('Successfully logged in', 2);
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
      message.error(state.error, 2);
    }
  };

  const { setUser } = useContext(UserContext);

  return (
    <Layout
      style={{
        width: '%100',
        height: '100vh',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      <Spin spinning={state.loading} delay={400}>
        <LoginForm handleLogin={handleLogin} />
      </Spin>
    </Layout>
  );
}

export default Index;
