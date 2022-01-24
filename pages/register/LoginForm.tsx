import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useState } from "react"

const LoginForm = ({ handleRegister }) => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values)
    handleRegister(values)
  }

  function onFinisFailed({ errorFields }) {
    setError(true)
  }
  const [form] = Form.useForm()

  const [isError, setError] = useState(false)
  const [userNameErrors, setuserNameErrors] = useState([])

  return (
    <Form
      name="register"
      className="register"
      onFinish={onFinish}
      scrollToFirstError={true}
      onFinishFailed={onFinisFailed}
    >
      <Form.Item name="username">
        <Input
          autoComplete="new-password"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your Password!" },
          {
            required: true,
            type: "regexp",
            pattern: new RegExp(/\d+/g),
            message: "Wrong format!",
          },
        ]}
      >
        <Input
          autoComplete="new-password"
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
  )
}
export default LoginForm
