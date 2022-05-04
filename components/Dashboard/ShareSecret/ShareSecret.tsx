import { Avatar, Card, Input } from 'antd';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './shareSecret.module.scss';
import ShareSecretModal from './ShareSecretModal';
import DashboardContext from '../../../context/DasboardContext';
import { UserContext } from '../../../context/UserContext';
function ShareSecret() {
  const { secretText, setShowShareSecretModal } = useContext(DashboardContext);
  const { user } = useContext(UserContext);
  return (
    <Card className={styles.card}>
      <Avatar className={styles.avatar} size={64} src={user.profilePic} />
      <Input
        className={styles.shareSecret}
        bordered={true}
        value={secretText}
        placeholder="Share your secret..."
        onClick={() => setShowShareSecretModal(true)}
      />
      <ShareSecretModal />
    </Card>
  );
}

ShareSecret.propTypes = {
  secretText: PropTypes.string,
  setSecretText: PropTypes.func,
  handlePostSecret: PropTypes.func
};

export default React.memo(ShareSecret);
