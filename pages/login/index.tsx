import React, { useContext, useReducer } from 'react';
import { Spin, Layout } from 'antd';
import Message from '../../helpers/Message';
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
    dispatch({ type: 'loading' });
    try {
      const response = await axios.post('/api/authorize', form);
      const result = await response.data;
      dispatch({ type: 'success', payload: result });
      Message('success', 'Successfully logged in', [2]);
      let d = new Date();
      d.setTime(d.getTime() + response.data.expires_in * 60 * 1000);
      Cookies.set('jwt_token', response.data.jwt_token, {
        path: '/',
        expires: d
      });
      axios.defaults.headers.common['Authorization'] = response.data.jwt_token;
      axios
        .get('/api/user', {
          headers: {
            Authorization: `Bearer ${response.data.jwt_token}`
          }
        })
        .then((res) => {
          setUser(res.data);
          dispatch({ type: 'success', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'error', payload: err.response.data.message });
        });
      router.push('/dashboard');
    } catch (error) {
      dispatch({ type: 'error', payload: error.response.data.error });
      Message('error', state.error, [2]);
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
