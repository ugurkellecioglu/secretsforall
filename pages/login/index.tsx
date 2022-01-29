import React, { useReducer, useState } from "react"
import { Form, Input, Button, Checkbox, Spin } from "antd"
import Message from "../../helpers/Message"
import axios from "axios"
import reducer from "./reducer"
import { useCookies } from "react-cookie"

function Index() {
  const [cookies, setCookie] = useCookies(["jwt_token"])

  const initialState = {
    loading: false,
    error: "",
    data: {},
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleLogin = async (form: Object) => {
    dispatch({ type: "loading" })
    try {
      const response = await axios.post("/api/authorize", form)
      const result = await response.data
      dispatch({ type: "success", payload: result })
      Message("success", "Successfully logged in", [2])
      let d = new Date()
      d.setTime(d.getTime() + response.data.expires_in * 60 * 1000)
      setCookie("jwt_token", response.data.jwt_token, {
        path: "/",
        expires: d,
      })
      console.log(result)
    } catch (error) {
      console.log(error.response.data.error)
      dispatch({ type: "error", payload: error.response.data.error })
      Message("error", state.error, [2])
    }
  }

  const onFinish = async (values: any) => {
    await handleLogin(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <Spin spinning={state.loading} delay={400}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      );
    </Spin>
  )
}

export default Index
