import { Card, Button, Col, Layout, Row, Input } from "antd"
import React from "react"
import Header from "../../components/Header"
import styles from "./style.module.css"
import secrets from "../../secrets.js"
import Avatar from "antd/lib/avatar/avatar"
const { TextArea } = Input
import users from "../../users.js"

const getUserInfo = (userId: Number) => {
  const user = users.find((user) => user.userId === userId)
  return user
}

const CardHeader = ({ secret }: any) => {
  const user = getUserInfo(Number(secret.userId))
  return (
    <>
      <Row align="middle">
        <Avatar src={user.profilePic || ""} />
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

function index() {
  return (
    <div>
      <Header />
      <Layout>
        <Layout.Content>
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
          <Row style={{ padding: "50px" }} gutter={4} justify="center">
            {secrets.map((secret, index) => (
              <Col className={styles.col} key={secret.secretId} span={8}>
                <Card
                  title={<CardHeader secret={secret} />}
                  bordered={false}
                  hoverable={true}
                >
                  {secret.secretText.substring(0, 100) + "..."}
                </Card>
              </Col>
            ))}
          </Row>
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default index
