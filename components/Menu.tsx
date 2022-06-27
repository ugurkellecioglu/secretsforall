import { Menu } from 'antd';
import Link from 'next/link';
import React from 'react';
interface MenuProps {
  divide?: boolean;
  data: Array<{
    title: string;
    url: string;
    path?: string;
  }>;
}

const MenuComp = (props: MenuProps) => (
  <Menu>
    {props.data.map((item, index) => (
      <>
        <Menu.Item key={index + index}>
          <Link href={item.url}>{item.title}</Link>
        </Menu.Item>
        {props.divide ? <Menu.Divider /> : null}
      </>
    ))}
  </Menu>
);

export default MenuComp;
