import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { LeftSquareFilled } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

function LoginForm({ handleLogin, cardStyles }) {
  const onFinish = async (values: any) => {
    await handleLogin(values);
  };
  const router = useRouter();

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };
  return (
    <Card
      className={styles.card}
      title="Login"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...cardStyles
      }}>
      <div className={styles.registerIconWrapper}>
        <div className={styles.registerIcon}>
          <LeftSquareFilled
            className={styles.registerIconComponent}
            onClick={() => router.push('/register')}
            
          />
          <div className={styles.registerLabel}>
            <span className={styles.registerLabelSpan}>Register</span>
          </div>
        </div>
      </div>
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Form.Item
          wrapperCol={{ span: 32 }}
          name="username"
          style={{ width: '300px' }}
          label="Username"
          className={styles.formLabel}
          rules={[{ required: true, Message: 'Please input your username!' } as any]}>
          <Input suffix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 32 }}
          name="password"
          label="Password"
          style={{ width: '300px' }}
          className={styles.formLabel}
          rules={[{ required: true, Message: 'Please input your password!' } as any]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 32 }} className={styles.loginBtn}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  cardStyles: PropTypes.object
};
LoginForm.defaultProps = {
  handleLogin: () => {},
  cardStyles: {}
};

export default LoginForm;
