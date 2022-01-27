import { Menu } from "antd"

interface MenuProps {
  divide?: boolean
  data: Array<{
    title: string
    url: string
    path?: string
  }>
}

const MenuComp = (props: MenuProps) => (
  <Menu>
    {props.data.map((item, index) => (
      <>
        <Menu.Item key={index}>
          <a href={item.url}>{item.title}</a>
        </Menu.Item>
        {props.divide ? <Menu.Divider /> : null}
      </>
    ))}
  </Menu>
)

export default MenuComp
