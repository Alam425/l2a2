import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
    port: process.env.PORT,
    localDatabaseUrl: process.env.LOCALDATABASEURL,
    databaseUrl: process.env.DATABASE,
    salt: process.env.SALT
}
