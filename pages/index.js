import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

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

const IconWrapper = ({ Icon, width, height, ...rest }) => {
  return (
    <Icon
      {...rest}
      style={{ cursor: "pointer", width: `${width}px`, height: `${height}px` }}
    />
  )
}
const generateSeed = () => (Math.random() + 1).toString(36).substring(7)
const Home = () => {
  const [seed, setSeed] = useState()
  const [url, setUrl] = useState(
    `https://avatars.dicebear.com/api/avataaars/${seed}.svg`
  )
  const [data, setData] = useState([])
  const [index, setIndex] = useState(0)
  const handleNextSeed = () => {
    console.log("next", data, index, data.length)
    if (index === data.length) {
      setSeed(generateSeed())
      setIndex(index + 1)
      setData([...data, seed])
    } else {
      setSeed(index + 1)
      setIndex(index + 1)
    }
  }
  const handlePrevSeed = () => {
    if (index <= 0) {
      console.log(data)
      setIndex(data.length - 1)
      setSeed(data[data.length - 1])
      return
    }
    console.log("previous", data, index, data.length)
    setSeed(data[index - 1])
    setIndex(index - 1)
  }
  useEffect(() => {
    setUrl(`https://avatars.dicebear.com/api/avataaars/${seed}.svg`)
  }, [seed])
  useEffect(() => {
    setSeed(generateSeed())
    setIndex(1)
    setData([seed])
  }, [])
  const svgRef = useRef()
  const handleSave = () => {
    console.log(svgRef.current)
    toDataURL(url).then((dataUrl) => {
      console.log("RESULT:", dataUrl)
    })
    // var s = new XMLSerializer().serializeToString(svgRef.current)
    // var encodedData = window.btoa(s)
    // console.log(encodedData)
    // var decodedData = window.atob(encodedData)
    // console.log(decodedData)
  }
  return (
    <Container className="pt-3">
      <Col lg={4}>
        <Card className="p-5 text-center d-flex align-items-center justify-content-center">
          <Card.Title>
            <h1>Sign Up</h1>
          </Card.Title>
          <div className="d-flex align-items-center">
            <IconWrapper
              onClick={(e) => handlePrevSeed()}
              Icon={BsArrowLeft}
              width={50}
              height={50}
            />
            <div ref={svgRef}>
              <Image
                width={150}
                height={150}
                src={url}
                loader={() => url}
                alt="Avatar"
              />
            </div>
            <IconWrapper
              onClick={() => handleNextSeed()}
              Icon={BsArrowRight}
              width={50}
              height={50}
            />
          </div>
          <Form>
            <Form.Group className="mt-4 mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => handleSave()}
              type="submit"
            >
              Register
            </Button>
          </Form>
        </Card>
      </Col>
    </Container>
  )
}

export default Home
