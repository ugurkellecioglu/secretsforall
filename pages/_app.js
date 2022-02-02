import '../styles/globals.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Cookies from 'js-cookie';
import checkJwt from '../helpers/checkJwt';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (Object.keys(user).length > 0) return;
    const jwt_token = Cookies.get('jwt_token');
    if (jwt_token) {
      axios
        .get('/api/user', {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        })
        .then((res) => {
          setUser(res.data);
          console.log('user is: ', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
