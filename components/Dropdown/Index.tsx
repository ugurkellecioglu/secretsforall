import { Dropdown, Menu } from 'antd';
import React from 'react';
import propTypes from 'prop-types';
const Index = ({ items, children }) => {
  return (
    <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>{children}</a>
    </Dropdown>
  );
};

Index.propTypes = {
  items: propTypes.array,
  children: propTypes.node
};

export default Index;
