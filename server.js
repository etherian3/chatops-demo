import express from "express"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.post("/slack/deploy", async (req, res) => {

  const env = req.body.text
  const user = req.body.user_name

  console.log("Deploy requested:", env)

  try {

    await axios.post(
      `https://api.github.com/repos/${process.env.REPO}/actions/workflows/deploy.yml/dispatches`,
      {
        ref: "main",
        inputs: {
          env: env
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json"
        }
      }
    )

    res.json({
      response_type: "in_channel",
      text: `🚀 ${user} triggered deploy to *${env}*`
    })

  } catch (error) {

    console.error(error)

    res.json({
      text: "❌ Deploy failed"
    })

  }

})

app.listen(3000, () => {
  console.log("ChatOps bot running on port 3000")
})