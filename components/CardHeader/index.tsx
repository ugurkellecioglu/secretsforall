import { Avatar, Button, Row } from 'antd';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dayjs from '../../helpers/dayjs';
import Link from 'next/link';
import { UserContext } from '../../context/UserContext';
import EditPostModal from '../EditPostModal';
import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import Dropdown from '../Dropdown/Index';
import axios from '../../helpers/axios';

const CardHeader = ({ updatedAt, user, text, postId, setText }) => {
  const userContext = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const items = [
    {
      label: (
        <Button icon={<EditOutlined />} type="link" onClick={() => setIsModalVisible(true)}>
          Edit
        </Button>
      ),
      key: '0'
    }
  ];
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = ({ user, postId, text }) => {
    axios
      .put(`/api/secrets`, {
        text: text,
        postId,
        user
      })
      .then((res) => {
        setText(text);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsModalVisible(false);
      });
  };

  return (
    <React.Fragment>
      <Row align="middle" justify="space-between">
        <Row>
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
        <div>
          {userContext?.user?._id === user?._id ? (
            <Dropdown items={items}>
              <Button shape="circle" icon={<MoreOutlined />} />
            </Dropdown>
          ) : null}
        </div>
      </Row>

      <EditPostModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
        postId={postId}
        text={text}
        updatedAt={updatedAt}
      />
    </React.Fragment>
  );
};
CardHeader.propTypes = {
  updatedAt: PropTypes.string,
  user: PropTypes.object,
  postId: PropTypes.string,
  text: PropTypes.string,
  setText: PropTypes.func
};

CardHeader.defaultProps = {
  updatedAt: '',
  user: {},
  setText: () => {}
};

export default CardHeader;
