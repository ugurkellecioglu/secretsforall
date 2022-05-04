import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { Avatar, Modal, Row, Typography } from 'antd';
import DashboardContext from '../../../context/DasboardContext';
import TextArea from 'antd/lib/input/TextArea';
import styles from './shareSecret.module.scss';
import { UserContext } from '../../../context/UserContext';
const ShareSecretModal = () => {
  const { user } = useContext(UserContext);

  const {
    showShareSecretModal,
    setShowShareSecretModal,
    setSecretText,
    secretText,
    handlePostSecret
  } = useContext(DashboardContext);
  const handleCancel = () => {
    setShowShareSecretModal(false);
  };
  const handleOk = () => {
    handlePostSecret({
      title: secretText.substring(0, 25),
      text: secretText
    })
      .then(() => {
        setShowShareSecretModal(false);
        setSecretText('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      className={styles.modal}
      visible={showShareSecretModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Share"
      centered
      title="Share Secret"
    >
      <Row className={styles.row}>
        <Avatar className={styles.avatar} size={32} src={user.profilePic} />
        <Typography.Title className={styles.title} level={5}>
          {user.username}
        </Typography.Title>
      </Row>
      <TextArea
        className={styles.tetxArea}
        rows={4}
        allowClear={true}
        showCount={true}
        autoSize={{ minRows: 3, maxRows: 6 }}
        placeholder="Share your secret..."
        value={secretText}
        onChange={(e) => setSecretText(e.target.value)}
        onClick={() => setShowShareSecretModal(true)}
      />
    </Modal>
  );
};

ShareSecretModal.propTypes = {
  show: propTypes.bool
};
export default ShareSecretModal;
