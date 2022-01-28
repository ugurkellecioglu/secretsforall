import { Card, Button, Col, Layout, Row, Input, Menu } from "antd"
import React from "react"
import Header from "../../components/Header"
import styles from "./style.module.css"
import secrets from "../../secrets.js"
import Avatar from "antd/lib/avatar/avatar"
const { TextArea } = Input
import users from "../../users.js"
import Overlay from "../../components/Overlay"

const getUserInfo = (userId: Number) => {
  const user = users.find((user) => user.userId === userId)
  return user
}

const CardHeader = ({ secret }: any) => {
  const user = getUserInfo(Number(secret.userId))
  return (
    <>
      <Row align="middle">
        <Avatar size="large" src={user.profilePic || ""} />
        <div>
          <span className={styles.username}>{user.username}</span>
          <p style={{ fontSize: "9px", color: "gray", fontWeight: "lighter" }}>
            {secret.createdAt}
          </p>
        </div>
      </Row>
    </>
  )
}

const Content = () => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col className={styles.ShareSecret} span={12}>
          <TextArea
            rows={4}
            allowClear={true}
            bordered={true}
            showCount={true}
            autoSize={{ minRows: 3, maxRows: 6 }}
            maxLength={300}
            placeholder="Share your secret..."
          />
          <Button type="primary">Submit</Button>
        </Col>
      </Row>
      <Row
        style={{ padding: "0 4px", display: "flex", flexWrap: "wrap" }}
        gutter={4}
        justify="center"
      >
        <Col className={styles.col} span={48}>
          {secrets.map((secret, index) => (
            <Card
              key={secret.secretId}
              title={<CardHeader secret={secret} />}
              bordered={true}
              hoverable={true}
              style={{ marginBottom: "10px", width: "50vw" }}
            >
              {secret.secretText + "..."}
            </Card>
          ))}
        </Col>
      </Row>
    </>
  )
}

function index() {
  return <Overlay Content={Content}></Overlay>
}

export default index
