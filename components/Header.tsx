import { Col, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { Layout } from 'antd';
import styles from './style.module.css';
import Avatar from 'antd/lib/avatar/avatar';
import { Dropdown } from 'antd';
import MenuComp from './Menu';
import { UserContext } from '../context/UserContext';
import Link from 'next/link';
import { MinusSquareFilled, PlusSquareFilled } from '@ant-design/icons';

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

const Header = () => {
  const { user } = useContext(UserContext);
  const [collapse, setCollapse] = React.useState(false);
  return (
    <div
      style={{
        width: '100vw',
        height: '10vh',
        zIndex: '999',
        backgroundColor: 'white'
      }}>
      <Head
        style={{
          backgroundColor: 'white',
          zIndex: '999',
          height: '10vh',
          position: 'fixed',
          width: '100vw',
          display: 'block'
        }}>
        <Row justify="space-between" align="middle">
          <Col style={{ display: 'flex' }}>
            <MinusSquareFilled style={{ fontSize: '25px', marginRight: '15px' }} />
            <Typography.Title level={5}>
              <Link href="/dashboard">Secrets for All</Link>
            </Typography.Title>
          </Col>
          <Col>
            <Typography.Text>
              Welcome you little secret keeper <b>{user.username}</b>
            </Typography.Text>
          </Col>
          <Col className={styles.col}>
            {/* <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            /> */}
            <Typography.Text italic={true} className="username">
              {user.username}
            </Typography.Text>
            <Dropdown
              className={styles.avatar}
              overlay={<MenuComp divide={false} data={menuData} />}
              trigger={['click']}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Avatar size={32} src={user.profilePic} />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Head>
    </div>
  );
};

export default Header;
