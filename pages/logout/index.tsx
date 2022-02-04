import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();
  useEffect(() => {
    Cookies.remove('jwtToken');
    router.push('/login');
  }, [router]);

  return <div>Logging out...</div>;
}

export default Index;
