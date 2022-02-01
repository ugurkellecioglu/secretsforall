import React, { useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

function Index() {
  const router = useRouter()
  useEffect(() => {
    Cookies.remove("jwt_token")
    router.push("/login")
  }, [])

  return <div>Logging out...</div>
}

export default Index
