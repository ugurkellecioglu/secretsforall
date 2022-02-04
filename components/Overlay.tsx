import { AppstoreTwoTone, StarTwoTone } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import Link from 'next/link';
import React from 'react';
import Header from './Header';

function Overlay({ Content }: any) {
  return (
    <div style={{ overflowX: 'hidden', height: '100%', backgroundColor: '#f0f2f5' }}>
      <Header />
      <Layout style={{ height: '90vh', width: '100%' }}>
        <Layout.Sider
          style={{
            overflow: 'auto',
            height: '100%',
            position: 'fixed',
            zIndex: 100
          }}
          theme="light">
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<AppstoreTwoTone />}>
              <Link href="/dashboard"> Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<StarTwoTone />}>
              <Link href="/random-secret">Random Secret</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <div style={{ marginTop: '30px' }}>
            <Content />
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default Overlay;
