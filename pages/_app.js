import '../styles/globals.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useEffect, useReducer, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Cookies from 'js-cookie';
import reducer from '../reducers/reducer';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import 'nprogress/nprogress.css';
import { HeaderProvider } from '../context/HeaderContext';
import axios from '../helpers/axios';
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: true
});
Router.events.on('routeChangeStart', () => {
  return NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  return NProgress.done();
});
Router.events.on('routeChangeError', () => {
  return NProgress.done();
});
function MyApp({ Component, pageProps }) {
  const initialState = {
    loading: false,
    error: '',
    data: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState({});
  const verify = async () => {
    if (Object.keys(user).length > 0) return;
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken !== undefined) {
      dispatch({ type: 'USER_LOADING' });
      axios
        .get('/api/user', {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
        .then((res) => {
          setUser(res.data);
          dispatch({ type: 'USER_SUCCESS', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'USER_ERROR', payload: err.response.data.Message });
        });
    }
  };
  useEffect(() => {
    verify();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Spin spinning={state.loading} delay={500} tip="Loading...">
        <HeaderProvider>
          <Component {...pageProps} />
        </HeaderProvider>
      </Spin>
    </UserContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default MyApp;
