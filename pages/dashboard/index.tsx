import { style } from "@dicebear/avatars/dist/utils"
import { Card, Button, Col, Layout, Row, Input } from "antd"
import React from "react"
import Header from "../../components/Header"
import styles from "./style.module.css"

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
          <Row justify="center" align="middle">
            <Col className={styles.col} span={6}>
              <Card title="Card title" bordered={true}>
                Card content
              </Card>
            </Col>
            <Col className={styles.col} span={6}>
              <Card title="Card title" bordered={true}>
                Card content
              </Card>
            </Col>
            <Col className={styles.col} span={6}>
              <Card title="Card title" bordered={true}>
                Card content
              </Card>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </div>
  )
}

export default index
