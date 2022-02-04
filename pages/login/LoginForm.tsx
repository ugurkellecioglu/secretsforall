import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import PropTypes from 'prop-types';

function LoginForm({ handleLogin }) {
  const onFinish = async (values: any) => {
    await handleLogin(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };
  return (
    <Card
      title="Login"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
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
        }}
      >
        <Form.Item
          wrapperCol={{ span: 32 }}
          name="username"
          label="Username"
          rules={[{ required: true, Message: 'Please input your username!' } as any]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 32 }}
          name="password"
          label="Password"
          rules={[{ required: true, Message: 'Please input your password!' } as any]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func
};
export default LoginForm;
