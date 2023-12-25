import config from "./config/index"
import app from "./app"
import mongoose from "mongoose"


const main = async() => {
  try {
    // await mongoose.connect(config.localDatabaseUrl as string)
    await mongoose.connect(config.databaseUrl as string)
    // await mongoose.connect(config.databaseUrl as string, { useNewUrlParser: true, useUnifiedTopology: true });

    // await mongoose.connect(config.databaseUrl as string, { useNewUrlParser: true });

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err: any) {
    console.log(err);
  }
} 

main()