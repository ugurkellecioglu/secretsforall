import { Layout } from 'antd';
import React, { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext';
import useDeviceDetect from '../helpers/useDeviceDetect';
import dynamic from 'next/dynamic';
type Props = { children: React.ReactNode };

const Header = dynamic(import('./Header/Header'));
const Sidebar = dynamic(import('./Sidebar/Sidebar'));
const TopMenu = dynamic(import('./TopMenu'));

const Overlay: React.FC<Props> = ({ children }) => {
  const { collapsed } = useContext(HeaderContext);
  const { isMobile } = useDeviceDetect();
  return (
    <div style={{ overflowX: 'hidden', height: '100%', backgroundColor: '#f0f2f5' }}>
      <Header />
      {isMobile && <TopMenu collapsed={collapsed} />}
      <Layout style={{ height: '90vh', width: '100%' }}>
        {!isMobile && <Sidebar collapsed={collapsed} />}
        <Layout.Content>
          <div>{children}</div>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default Overlay;
