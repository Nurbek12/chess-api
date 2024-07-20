import { IUser } from './src/models/user.model'
import * as express from 'express-serve-static-core'

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}