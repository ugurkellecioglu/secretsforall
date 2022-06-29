import { Col, Typography } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { RedoOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

function AvatarController({ handleAvatarChange }) {
  return (
    <>
      <Col span={24} style={{ textAlign: 'center' }}>
        <div className={styles.icon}>
          <RedoOutlined onClick={() => handleAvatarChange()} />
        </div>
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
