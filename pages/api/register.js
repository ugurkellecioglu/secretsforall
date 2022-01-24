import getUsers from "../../helpers/getUsers"
const fs = require("fs")
const bcrypt = require("bcryptjs")
const saltRounds = 10

export default async function handler(req, res) {
  setTimeout(async () => {
    if (req.method !== "POST") return
    const body = req.body
    const { username, password, profilePic } = body
    if (!username || !password || !profilePic) {
      res
        .status(400)
        .json({ error: "profilepic, username and password are required" })
      return
    }
    const user = { username, password, profilePic }

    const users = await getUsers()
    const existingUser = users
      ? users.find((user) => user.username === username)
      : false
    if (existingUser) {
      res.status(400).json({ error: "user already exists" })
      return
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    user.password = hashedPassword
    users.push(user)

    fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
      return res.status(500).json({ error: "could not save user" })
    })

    return res.status(201).json({ message: "user successfully created" })
  }, 1000)
}
