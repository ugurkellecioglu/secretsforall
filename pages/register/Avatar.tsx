import { Spin } from 'antd';
import Image from 'next/image';
import React from 'react';
import PropTypes from 'prop-types';

function Avatar({ avatarLoading, avatar }) {
  return (
    <>
      <Spin spinning={avatarLoading} size="small" delay={100}>
        <Image
          width={150}
          height={150}
          src={avatar}
          loader={() => avatar}
          alt="Avatar"
          unoptimized={true}
          draggable="false"
        />
      </Spin>
    </>
  );
}
Avatar.propTypes = {
  avatarLoading: PropTypes.bool,
  avatar: PropTypes.string
};
export default Avatar;
