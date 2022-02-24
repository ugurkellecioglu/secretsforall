import { Layout } from 'antd';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Overlay = ({ Content }: any) => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div style={{ overflowX: 'hidden', height: '100%', backgroundColor: '#f0f2f5' }}>
      <Header setCollapsed={setCollapsed} collapsed={collapsed} />
      <Layout style={{ height: '90vh', width: '100%' }}>
        <Sidebar collapsed={collapsed} />
        <Layout.Content>
          <div style={{ marginTop: '30px' }}>
            <Content />
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default Overlay;
