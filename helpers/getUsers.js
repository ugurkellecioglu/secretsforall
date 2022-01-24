const fs = require("fs")

const getUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      const users = fs.readFileSync("users.json", "utf-8", (err) => [])
      resolve(JSON.parse(users))
    } catch (error) {
      fs.writeFile("users.json", "", (err) => err)
      resolve([])
    }
  })
}

export default getUsers
