import { Card, Button, Col, Layout, Row, Input } from "antd"
import React from "react"
import Header from "../../components/Header"
import styles from "./style.module.css"
import secrets from "../../secrets.js"
const { TextArea } = Input

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
              />
              <Button type="primary">Submit</Button>
            </Col>
          </Row>
          <Row
            style={{ padding: "50px" }}
            gutter={4}
            justify="center"
            align="middle"
          >
            {secrets.map((secret, index) => (
              <Col className={styles.col} key={secret.secretId} span={24}>
                <Card
                  title={secret.secretText.substring(0, 20)}
                  bordered={true}
                >
                  {secret.secretText}
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
