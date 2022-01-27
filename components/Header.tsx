import { Col, Row, Typography } from "antd"
import React from "react"
import { Layout } from "antd"
import styles from "./style.module.css"
import { UserOutlined, DownOutlined } from "@ant-design/icons"
import Avatar from "antd/lib/avatar/avatar"
import { Dropdown } from "antd"
import MenuComp from "./Menu"

const { Header: Head } = Layout
const menuData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    path: "/dashboard",
  },
  {
    title: "Profile",
    url: "/profile",
    path: "/profile",
  },
  {
    title: "Logout",
    url: "/logout",
    path: "/logout",
  },
]
function Header() {
  return (
    <div className={styles.wrapper}>
      <Head className={styles.header}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography.Title level={5}>Secrets for All</Typography.Title>
          </Col>
          <Col className={styles.col}>
            <Typography.Text italic={true} className="username">
              sensetil0346
            </Typography.Text>
            <Dropdown
              className={styles.avatar}
              overlay={<MenuComp divide={false} data={menuData} />}
              trigger={["click"]}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar size={32} icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Head>
    </div>
  )
}

export default Header
