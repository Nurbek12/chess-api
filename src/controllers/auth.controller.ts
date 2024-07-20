import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { IUser } from '../models/user.model'
import { validationResult } from 'express-validator'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config/keys'
import { find_user_by_options, create_user } from '../services/user.service'

const create_tokens = (userData: Partial<IUser>) => {
    const access_token = jwt.sign(userData, JWT_ACCESS_SECRET!, { expiresIn: '4h' })
    const refresh_token = jwt.sign({_id: userData._id?.toString()!}, JWT_REFRESH_SECRET!, { expiresIn: '48h' })

    return {
        access_token,
        refresh_token
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(422).json({ status: "warning", message: errors.array().map(e => e.msg).join(' \n') })

        const user = await find_user_by_options('email', req.body.email)

        if(!user) return res.status(404).json({ status: 'warning', message: 'User with this email not exists!' })

        if(!(await bcrypt.compare(req.body.password, user.password))) return res.status(400).json({ status: 'warning', message: 'Password is incorrect!' })

        const userData = {
            _id: user._id,
            age: user.age,         
            rate: user.rate,         
            role: user.role,            
            email: user.email,
            country: user.country,         
            first_name: user.first_name,
            last_name: user.last_name,
        }

        return res.status(200).json({...create_tokens(userData), user: userData})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(422).json({ status: "warning", message: errors.array().map(e => e.msg).join(' \n') })

        const { first_name, last_name, age, email, country, password, gender } = req.body

        const user = await find_user_by_options('email', email)

        if(user) return res.status(400).json({ status: 'warning', message: 'This email already exists!' })
        
        const hash = await bcrypt.hash(password, 10)

        const newUser = await create_user({first_name, last_name, age, email, country, gender, password: hash })

        return res.status(200).json({ status: 'ok', message: 'Successfully registered!', user: newUser })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(422).json({ status: "warning", message: errors.array().map(e => e.msg).join(' \n') })

        const payload: any = jwt.verify(req.body.refresh_token, JWT_REFRESH_SECRET!)

        const user = await find_user_by_options('_id', payload._id)

        if(!user) return res.status(404).json({ status: 'warning', message: 'User with this refresh token not exists!' })
        
        const userData = {
            _id: user._id,
            age: user.age,
            rate: user.rate,
            role: user.role,
            email: user.email,
            country: user.country,
            first_name: user.first_name,
            last_name: user.last_name,
        }

        return res.status(200).json(create_tokens(userData))
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}