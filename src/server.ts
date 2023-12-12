import config from "./config/index"
import app from "./app"
import mongoose from "mongoose"


const main = async() => {
  try {
    await mongoose.connect(config.localDatabaseUrl as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err: any) {
    console.log(err);
  }
} 

main()