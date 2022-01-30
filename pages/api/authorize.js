import mongo from "./client"

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

export default async function handler(req, res) {
  // if method is not post
  if (req.method !== "POST") return
  // get the body
  const body = req.body
  // get the username and password
  const { username, password } = body
  // if username or password is not present
  if (!username || !password) {
    res.status(400).json({ error: "username and password are required" })
    return
  }

  mongo("secretsforall", "users", async (collection) => {
    const user = await collection.findOne({ username })
    if (!user) {
      res.status(400).json({ error: "User not found" })
      return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid password" })
      return
    }
    const token = jwt.sign({ id: user._id, username: user.username }, secret, {
      expiresIn: "1h",
    })
    res
      .status(200)
      .json({ username: user.username, jwt_token: token, expires_in: 60 })
  })
}
