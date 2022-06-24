import { Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { Layout } from 'antd';
import '../style.module.css';
import Avatar from 'antd/lib/avatar/avatar';
import { Dropdown } from 'antd';
import MenuComp from '../Menu';
import { UserContext } from '../../context/UserContext';
import { HeaderContext } from '../../context/HeaderContext';
import Link from 'next/link';
import { MinusSquareFilled, PlusSquareFilled } from '@ant-design/icons';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';

const { Header: Head } = Layout;

const Header = () => {
  const { user } = useContext(UserContext);
  const { collapsed, setCollapsed } = useContext(HeaderContext);
  const menuData = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      path: '/dashboard'
    },
    {
      title: 'Profile',
      url: `/profile/${user.username}`,
      path: '/profile'
    },
    {
      title: 'Logout',
      url: '/logout',
      path: '/logout'
    }
  ];

  return (
    <div
      style={{
        width: '100vw',
        height: '10vh',
        zIndex: '999',
        backgroundColor: 'white'
      }}
      className={styles.header}
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
          <div style={{ display: 'flex' }}>
            <span
              onClick={() => setCollapsed((prev) => !prev)}
              style={{ cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
            >
              {collapsed ? (
                <PlusSquareFilled style={{ fontSize: '25px', marginRight: '15px' }} />
              ) : (
                <MinusSquareFilled style={{ fontSize: '25px', marginRight: '15px' }} />
              )}
            </span>
            <Typography.Title level={5} style={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/dashboard">Secrets for All</Link>
            </Typography.Title>
          </div>
          <div className={styles.welcome}>
            <Typography.Text>
              Welcome you little secret keeper <b>{user.username}</b>
            </Typography.Text>
          </div>
          <div className={styles.col}>
            <Typography.Text italic={true} className="username">
              {user.username}
            </Typography.Text>
            <Dropdown
              className={styles.avatar}
              overlay={<MenuComp divide={false} data={[...menuData]} />}
              trigger={['click']}
            >
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Avatar size={32} src={user.profilePic} />
              </a>
            </Dropdown>
          </div>
        </Row>
      </Head>
    </div>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func
};

Header.defaultProps = {
  collapsed: false,
  setCollapsed: () => {}
};

export default Header;
