import { Spin, Card, Layout, Row, Space, Col } from "antd"
import { useState } from "react"
import axios from "axios"
import LoginForm from "./LoginForm"
import styles from "./style.module.css"
import useAvatar from "./useAvatar"
import Message from "../../helpers/Message"
import Header from "./Header"
import Avatar from "./Avatar"
import AvatarController from "./AvatarController"
import Vector from "../../public/Speech bubbles-bro.svg"
import Image from "next/image"
const Home = () => {
  const [avatar, changeAvatar] = useAvatar()
  const [loading, setLoading] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const handleRegister = (form: Object) => {
    setLoading(true)
    axios
      .post("/api/register", form)
      .then((res) => {
        if (res.status === 201) {
          Message("success", "You have successfully registered!", [5])
        } else {
          Message("error", "Something went wrong!", [5])
        }
      })
      .catch((err) => {
        console.log("ERR", err)
        Message("error", "err", [2])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleAvatarChange(): void {
    setAvatarLoading(true)
    setTimeout(() => {
      changeAvatar()
      setAvatarLoading(false)
    }, 500)
  }

  return (
    <Layout style={{ width: "%100", height: "100vh" }}>
      <Spin spinning={loading} delay={500} tip="Loading...">
        <Row justify="center" align="middle">
          <Col md={9}>
            <Card
              style={{ height: "100vh", display: "flex", alignItems: "center" }}
            >
              <Space direction="vertical" size="large">
                <Row style={{ textAlign: "center" }}>
                  <Header />
                </Row>
                <Row align="middle" justify="center">
                  <Avatar avatar={avatar} avatarLoading={avatarLoading} />
                </Row>
                <Row justify="center">
                  <AvatarController
                    handleAvatarChange={handleAvatarChange}
                    styles={styles}
                  />
                </Row>
                <Row justify="center">
                  <LoginForm
                    handleRegister={(form) =>
                      handleRegister({ ...form, profilePic: avatar })
                    }
                  />
                </Row>
              </Space>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Image src={Vector} alt="Group of People Image" />
          </Col>
        </Row>
      </Spin>
    </Layout>
  )
}

export default Home
