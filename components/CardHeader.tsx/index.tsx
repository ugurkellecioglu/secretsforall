import { Avatar, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';

const CardHeader = ({ updatedAt, user }: any) => {
  return (
    <React.Fragment>
      <Row align="middle">
        <Avatar size="large" src={user?.profilePic} />
        <div>
          <span>{user.username}</span>

          <p style={{ fontSize: '9px', color: 'gray', fontWeight: 'lighter' }}>
            {moment(updatedAt).fromNow()}
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
