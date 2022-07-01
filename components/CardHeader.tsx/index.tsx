import { Avatar, Row } from 'antd';

import React from 'react';
import PropTypes from 'prop-types';
import dayjs from '../../helpers/dayjs';
import Link from 'next/link';
const CardHeader = ({ updatedAt, user }: any) => {
  return (
    <React.Fragment>
      <Row align="middle">
        <Avatar size="large" src={user?.profilePic} />
        <div>
          <Link href={`/profile/${user.username}`}>
            <span>{user.username}</span>
          </Link>
          <p style={{ fontSize: '9px', color: 'gray', fontWeight: 'lighter' }}>
            {dayjs(updatedAt).fromNow()}
          </p>
        </div>
      </Row>
    </React.Fragment>
  );
};
CardHeader.propTypes = {
  updatedAt: PropTypes.string,
  user: PropTypes.object
};

CardHeader.defaultProps = {
  updatedAt: '',
  user: {}
};

export default CardHeader;
