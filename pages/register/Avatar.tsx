import { Spin } from "antd"
import Image from "next/image"
import React from "react"

function Avatar({ avatarLoading, avatar }) {
  return (
    <>
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
    </>
  )
}

export default Avatar
