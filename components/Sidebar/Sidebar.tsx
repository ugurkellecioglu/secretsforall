import React from 'react';
import { AppstoreTwoTone, MessageTwoTone, StarTwoTone } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './sidebar.module.scss';
function Sidebar({ collapsed }) {
  return (
    <div className={styles.wrapper}>
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
          <Menu.Item key="3" icon={<MessageTwoTone />}>
            <Link href="/chat">Chat</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    </div>
  );
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool
};

Sidebar.defaultProps = {
  collapsed: false
};

export default Sidebar;
