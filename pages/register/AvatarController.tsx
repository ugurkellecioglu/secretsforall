import { Col, Typography } from 'antd';
import React from 'react';
import { BsDice5Fill } from 'react-icons/bs';
import PropTypes from 'prop-types';

function AvatarController({ handleAvatarChange, styles }) {
  return (
    <>
      <Col span={24} style={{ textAlign: 'center' }}>
        <BsDice5Fill onClick={() => handleAvatarChange()} className={styles && styles.icon} />
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Typography.Text>Roll the Dice!</Typography.Text>
      </Col>
    </>
  );
}

AvatarController.propTypes = {
  handleAvatarChange: PropTypes.func,
  styles: PropTypes.object
};
export default AvatarController;
