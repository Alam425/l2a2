import config from "./config/index"
import app from "./app"

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})