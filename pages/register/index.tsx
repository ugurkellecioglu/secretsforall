import { Button, Card, Col, Layout, Row, Space, Typography } from "antd"
import { Content } from "antd/lib/layout/layout"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BsDice5Fill } from "react-icons/bs"
import axios from "axios"
import LoginForm from "./LoginForm"
import styles from "./register.module.css"
import useAvatar from "./useAvatar"
const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )

const generateSeed = (): string => (Math.random() + 1).toString(36).substring(7)
const Home = () => {
  const [avatar, setAvatar] = useAvatar()

  const handleRegister = (form: Object) => {
    console.log("index ", form)

    axios
      .post("/api/register", form)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const svgRef = useRef()
  // const handleSave = () => {
  //   console.log(svgRef.current)
  //   toDataURL(url).then((dataUrl: string) => {
  //     console.log("RESULT:", dataUrl)
  //     var decodedData = window.atob(dataUrl)
  //     console.log(decodedData)
  //   })
  // var s = new XMLSerializer().serializeToString(svgRef.current)
  // var encodedData = window.btoa(s)
  // console.log(encodedData)
  // var decodedData = window.atob(encodedData)
  // console.log(decodedData)
  return (
    <Layout className="pt-3">
      <Content>
        <Row justify="center" align="middle">
          <Card>
            <Space direction="vertical" size="large">
              <Row style={{ textAlign: "center" }}>
                <Col span={24}>
                  <Typography.Title level={1}>Sign Up</Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    Register and start sharing your secrets with everyone.
                  </Typography.Text>
                </Col>
              </Row>
              <Row align="middle" justify="center">
                <div>
                  <Image
                    width={150}
                    height={150}
                    src={avatar}
                    loader={() => avatar}
                    alt="Avatar"
                    unoptimized={true}
                    draggable="false"
                  />
                </div>
              </Row>
              <Row justify="center">
                <Col span={24} style={{ textAlign: "center" }}>
                  <BsDice5Fill
                    onClick={() => setAvatar()}
                    className={styles.icon}
                  />
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Typography.Text>Roll the Dice!</Typography.Text>
                </Col>
              </Row>
              <Row justify="center">
                <LoginForm handleRegister={(form) => handleRegister(form)} />
              </Row>
            </Space>
          </Card>
        </Row>
      </Content>
    </Layout>
  )
}

export default Home
