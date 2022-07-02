import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from '../../helpers/axios';
function Index() {
  const router = useRouter();
  const logout = async () => {
    await axios.post('/api/logout');
    Cookies.remove('jwtToken');
    axios.defaults.headers.common['Authorization'] = '';
    // delete axios cookies

    router.push('/login');
  };

  useEffect(() => {
    logout();
  }, [router]);

  return <div>Logging out...</div>;
}

export default Index;
