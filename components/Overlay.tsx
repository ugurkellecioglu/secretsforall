import { Layout } from 'antd';
import React, { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
type Props = { children: React.ReactNode };
const Overlay: React.FC<Props> = ({ children }) => {
  const { collapsed } = useContext(HeaderContext);
  return (
    <div style={{ overflowX: 'hidden', height: '100%', backgroundColor: '#f0f2f5' }}>
      <Header />
      <Layout style={{ height: '90vh', width: '100%' }}>
        <Sidebar collapsed={collapsed} />
        <Layout.Content>
          <div style={{ marginTop: '30px' }}>{children}</div>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default Overlay;
