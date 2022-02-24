import React from 'react';
import { AppstoreTwoTone, StarTwoTone } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
function Sidebar({ collapsed }) {
  return (
    <>
      <Layout.Sider
        style={{
          overflow: 'auto',
          height: '100%',
          position: 'fixed',
          zIndex: 100
        }}
        collapsed={collapsed}
        theme="light"
      >
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<AppstoreTwoTone />}>
            <Link href="/dashboard"> Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<StarTwoTone />}>
            <Link href="/random-secret">Random Secret</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    </>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool
};

Sidebar.defaultProps = {
  collapsed: false
};

export default Sidebar;
