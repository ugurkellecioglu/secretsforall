import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { Modal, notification, Row, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from '../../helpers/axios';
import { UserContext } from '../../context/UserContext';
const EditProfileModal = ({ show, setShow }) => {
  const { user, setUser } = useContext(UserContext);
  const [info, setInfo] = useState('');
  const handleCancel = () => {
    setShow(false);
  };
  const handleOk = async () => {
    try {
      const response = await axios.put(`/api/user/${user.username}`, {
        info
      });
      if (response.status === 200) {
        setShow(false);
        setUser({ ...user, info });
        notification.success({
          message: 'Success',
          description: 'Profile updated successfully'
        });
      }
    } catch (error) {
      console.log(error);
      notification.warning({
        message: 'Error',
        description: 'Something went wrong'
      });
    }
  };

  return (
    <Modal
      visible={show}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Share"
      centered
      title="Share Secret">
      <Row>
        <Typography.Title level={5}>Profile Info</Typography.Title>
      </Row>
      <TextArea
        rows={4}
        allowClear={true}
        showCount={true}
        autoSize={{ minRows: 1, maxRows: 2 }}
        placeholder="Profile info..."
        value={info}
        onChange={(e) => {
          setInfo(e.target.value);
        }}
        onClick={() => setShow(true)}
      />
    </Modal>
  );
};

EditProfileModal.propTypes = {
  show: propTypes.bool,
  setShow: propTypes.func
};
export default EditProfileModal;
