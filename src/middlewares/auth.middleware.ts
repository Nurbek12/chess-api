import jwt from 'jsonwebtoken'
import { IUser } from '../models/user.model'
import { JWT_ACCESS_SECRET } from '../config/keys'
import { Request, Response, NextFunction } from 'express'

export interface AuthencatedRequest extends Request {
    user?: IUser
}

export const authMiddleware = (role?: "ADMIN" | "PLAYER") => 
    (req: AuthencatedRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if(!token) return res.status(401).json({ status: 'warning', message: 'Invalid Token' })

        try {
            const payload_user = jwt.verify(token, JWT_ACCESS_SECRET!)
            req['user'] = payload_user as IUser
            if(role && req.user.role !== role) res.status(401).json({ status: 'warning', message: 'You cannot send a request to this path' })
            next()
        } catch (error) {
            return res.status(401).json({ status: 'warning', message: 'Invalid Token' })
        }
}