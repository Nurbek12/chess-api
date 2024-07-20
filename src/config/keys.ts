import { config } from 'dotenv'

config()

export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_ACCESS_SECRET = process.env.MONGODB_URI
export const JWT_REFRESH_SECRET = process.env.MONGODB_URI
export const PORT = process.env.PORT