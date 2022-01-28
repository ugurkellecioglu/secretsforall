import { Menu, Layout } from "antd"
import React from "react"
import Header from "./Header"

function Overlay({ Content }: any) {
  return (
    <div>
      <Header />
      <Layout>
        <Layout.Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
          }}
          theme="light"
        >
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Dashboard</Menu.Item>
            <Menu.Item key="2">Random Secret</Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <Content />
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default Overlay
