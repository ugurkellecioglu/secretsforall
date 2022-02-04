import '../styles/globals.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useEffect, useReducer, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import reducer from '../reducers/reducer';
import { Spin } from 'antd';
import { verify } from 'jsonwebtoken';

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
    const jwt_token = Cookies.get('jwt_token');
    if (jwt_token) {
      dispatch({ type: 'USER_LOADING' });
      axios
        .get('/api/user', {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        .then((res) => {
          setUser(res.data);
          dispatch({ type: 'USER_SUCCESS', payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: 'USER_ERROR', payload: err.response.data.message });
        });
    }
  };
  useEffect(() => {
    verify();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Spin spinning={state.loading} delay={500} tip="Loading...">
        <Component {...pageProps} />
      </Spin>
    </UserContext.Provider>
  );
}

export default MyApp;
