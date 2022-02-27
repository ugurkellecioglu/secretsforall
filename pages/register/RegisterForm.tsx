import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import React from 'react';

const LoginForm = ({ handleRegister }) => {
  const onFinish = (values: any) => {
    handleRegister(values);
  };

  function onFinisFailed({ errorFields }) {
    setError(true);
    return errorFields;
  }

  const [isError, setError] = useState(false);

  return (
    <Form
      name="register"
      className="register"
      onFinish={onFinish}
      scrollToFirstError={true}
      onFinishFailed={onFinisFailed}
    >
      <Form.Item
        name="username"
        className={styles.formItem}
        rules={[{ required: true, Message: 'Can you please provide an username?' } as any]}
      >
        <Input
          autoComplete="new-password"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            Message: 'It seems you forgot to enter a password.'
          } as any,
          {
            required: true,
            type: 'regexp',
            pattern: new RegExp(/\d+/g),
            Message: 'Wrong format!'
          }
        ]}
      >
        <Input.Password
          autoComplete="new-password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          shape="round"
          size="middle"
          block={true}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          danger={isError}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
LoginForm.propTypes = {
  handleRegister: PropTypes.func
};
export default LoginForm;
