import { AppstoreTwoTone, MessageTwoTone, StarTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import styles from './TopMenu.module.scss';
const TopMenu: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (!collapsed) {
        ref.current.classList.add(styles.active);
      } else if (ref.current.classList.contains(styles.active)) {
        ref.current.classList.remove(styles.active);
      }
    }
  }, [collapsed]);

  return (
    <div className={`${styles.wrapper} `} ref={ref}>
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
    </div>
  );
};

export default TopMenu;
