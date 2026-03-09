import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.send("Hello from ChatOps deployed app 🚀")
})

app.listen(4000, () => {
  console.log("App running on port 4000")
})