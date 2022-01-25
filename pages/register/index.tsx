import {
  Button,
  Spin,
  Skeleton,
  Card,
  Col,
  Layout,
  Row,
  Space,
  Typography,
} from "antd"
import { Content } from "antd/lib/layout/layout"
import Image from "next/image"
import { useState } from "react"
import { BsDice5Fill } from "react-icons/bs"
import axios from "axios"
import LoginForm from "./LoginForm"
import styles from "./register.module.css"
import useAvatar from "./useAvatar"
import Message from "../../helpers/Message"

const Home = () => {
  const [avatar, setAvatar] = useAvatar()
  const [loading, setLoading] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const handleRegister = (form: Object) => {
    setLoading(true)
    axios
      .post("/api/register", form)
      .then((res) => {
        if (res.status === 201) {
          Message("success", "You have successfully registered!", [5])
        }
      })
      .catch((err) => {
        Message("error", "Register Failed!")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleAvatarChange(): void {
    setAvatarLoading(true)
    setTimeout(() => {
      setAvatar()
      setAvatarLoading(false)
    }, 500)
  }

  return (
    <Layout className="pt-3">
      <Spin spinning={loading} delay={500} tip="Loading...">
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
                  <Spin spinning={avatarLoading} size="small" delay={100}>
                    <Image
                      width={150}
                      height={150}
                      src={avatar}
                      loader={() => avatar}
                      alt="Avatar"
                      unoptimized={true}
                      draggable="false"
                    />
                  </Spin>
                </Row>
                <Row justify="center">
                  <Col span={24} style={{ textAlign: "center" }}>
                    <BsDice5Fill
                      onClick={() => handleAvatarChange()}
                      className={styles.icon}
                    />
                  </Col>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Typography.Text>Roll the Dice!</Typography.Text>
                  </Col>
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
          </Row>
        </Content>
      </Spin>
    </Layout>
  )
}

export default Home
