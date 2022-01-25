import getUsers from "../../helpers/getUsers"
const fs = require("fs")
const bcrypt = require("bcryptjs")
const saltRounds = 10

export default async function handler(req, res) {
  setTimeout(async () => {
    try {
      if (req.method !== "POST") return
      const body = req.body
      const { username, password, profilePic } = body
      if (!username || !password || !profilePic) {
        throw new Error("Missing username, password or profilePic")
      }
      const user = { username, password, profilePic }

      const users = await getUsers()
      const existingUser = users
        ? users.find((user) => user.username === username)
        : false
      if (existingUser) {
        throw new Error("Username already exists")
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      user.password = hashedPassword
      users.push(user)

      fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
        throw new Error("Error saving user")
      })

      return res.status(201).send({ message: "user successfully created" })
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  }, 1000)
}
