import { message } from "antd"
const Message = (type: any, txt: String, ...rest) => {
  message[type](txt, rest)
}
export default Message
