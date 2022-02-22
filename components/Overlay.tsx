import { AppstoreTwoTone, StarTwoTone } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import Link from 'next/link';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Overlay = ({ Content }: any) => {
  return (
    <div style={{ overflowX: 'hidden', height: '100%', backgroundColor: '#f0f2f5' }}>
      <Header />
      <Layout style={{ height: '90vh', width: '100%' }}>
        <Sidebar collapsed={true} />
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
