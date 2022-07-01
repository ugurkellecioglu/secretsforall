import { Avatar, Card, Input } from 'antd';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './shareSecret.module.scss';
import DashboardContext from '../../../context/DasboardContext';
import { UserContext } from '../../../context/UserContext';
import dynamic from 'next/dynamic';

function ShareSecret() {
  const { secretText, setShowShareSecretModal } = useContext(DashboardContext);
  const { user } = useContext(UserContext);
  const [ShareSecretModal, setShareSecretModal] = useState(null);
  const onClick = () => {
    const ShareSecretModal = dynamic(() => import('./ShareSecretModal'));
    setShareSecretModal(<ShareSecretModal />);
    setShowShareSecretModal(true);
  };

  return (
    <Card className={styles.card}>
      <Avatar className={styles.avatar} size={64} src={user.profilePic} />
      <Input
        className={styles.shareSecret}
        bordered={true}
        value={secretText}
        placeholder="Share your secret..."
        onClick={onClick}
      />
      {ShareSecretModal}
    </Card>
  );
}

ShareSecret.propTypes = {
  secretText: PropTypes.string,
  setSecretText: PropTypes.func,
  handlePostSecret: PropTypes.func
};

export default React.memo(ShareSecret);
