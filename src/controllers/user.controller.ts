import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { find_all_users, count_of_users, delete_user, update_user, find_user_by_options, get_leaders } from '../services/user.service'

export const get_all_users = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = String(req.query.search)
    
        const [users, count] = await Promise.all([
            find_all_users(page, limit, search),
            count_of_users(search)
        ])

        res.status(200).json({ users, count, page, limit })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const get_leaderboard = async (req: Request, res: Response) => {
    try {
        const leaders = await get_leaders()
        res.status(200).json({ leaders })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const get_by_id = async (req: Request, res: Response) => {
    try {
        const user = await find_user_by_options('_id', req.params.id)

        res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const update_user_by_id = async (req: Request, res: Response) => {
    try {
        if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = await update_user(req.params.id, req.body)

        res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const delete_user_by_id = async (req: Request, res: Response) => {
    try {
        const user = await find_user_by_options('_id', req.params.id)
        if(!user) return res.status(404).json({ status: 'warning', message: 'User with this id not exists!' })

        await delete_user(req.params.id)

        res.status(200).json({ status: 'ok', message: "User successfully deleted!" })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}