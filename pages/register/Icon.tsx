import { ComponentType } from "react"

interface Props {
  Icon: ComponentType<any>
  width: number
  height: number
  [key: string]: any
}
const Icon = ({ Icon, width, height, ...rest }: Props) => {
  const iconStyle: React.CSSProperties = {
    cursor: "pointer",
    width: width + "px",
    height: height + "px",
  }
  return <Icon style={iconStyle} {...rest} />
}

export default Icon
