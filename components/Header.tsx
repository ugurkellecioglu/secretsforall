import { Col, Row, Switch, Typography } from 'antd';
import React, { useContext } from 'react';
import { Layout } from 'antd';
import styles from './style.module.css';
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Dropdown } from 'antd';
import MenuComp from './Menu';
import { UserContext } from '../context/UserContext';

const { Header: Head } = Layout;
const menuData = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    path: '/dashboard'
  },
  {
    title: 'Profile',
    url: '/profile',
    path: '/profile'
  },
  {
    title: 'Logout',
    url: '/logout',
    path: '/logout'
  }
];
function Header() {
  const { user } = useContext(UserContext);
  return (
    <div
      style={{
        width: '100vw',
        height: '10vh',
        zIndex: '999',
        backgroundColor: 'white'
      }}
    >
      <Head
        style={{
          backgroundColor: 'white',
          zIndex: '999',
          height: '10vh',
          position: 'fixed',
          width: '100vw',
          display: 'block'
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Title level={5}>Secrets for All</Typography.Title>
          </Col>
          <Col>
            <Typography.Text>Welcome you little secret keeper {user.username}!</Typography.Text>
          </Col>
          <Col className={styles.col}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
            <Typography.Text italic={true} className="username">
              {user.username}
            </Typography.Text>
            <Dropdown
              className={styles.avatar}
              overlay={<MenuComp divide={false} data={menuData} />}
              trigger={['click']}
            >
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Avatar size={32} icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Head>
    </div>
  );
}

export default Header;
