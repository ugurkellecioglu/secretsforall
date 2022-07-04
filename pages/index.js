import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return <div>You are redirecting to login</div>;
};

export default index;
