import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { create_match } from '../services/match.service'
import { AuthencatedRequest } from '../middlewares/auth.middleware'
import { create_tournament, delete_tournament, find_all_tournaments, find_tournament_by_id, update_tournament, count_of_tournaments, push_to_users } from '../services/tournament.service'

export const create_tree = async (users: any[], id: string, random: boolean = true) => {
    const currentDate = new Date()

    if(random) {
        for (let i = users.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [users[i], users[j]] = [users[j], users[i]]
        }
    }

    for(let i=0; i<users.length/2; i++) {
        await create_match({
            index_of_tree: i + 1,
            status: 'NOT_STARTED',
            tournament: id as any,
            level_of_tree: users.length/2,
            date: currentDate.toLocaleDateString(),
            users: [users[2*i], users[2*i+1]] as any,
        })

        currentDate.setDate(currentDate.getDate() + 1)
    }
}

export const get_all_tournaments = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        
        const [tournament, count] = await Promise.all([
            find_all_tournaments(page, limit),
            count_of_tournaments()
        ])

        res.status(200).json({ tournament, count })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const create_new_tournament = async (req: Request, res: Response) => {
    try {
        const tournament = await create_tournament(req.body);
        res.status(200).json({ tournament })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const register_to_tournament = async (req: AuthencatedRequest, res: Response) => {
    try {
        await push_to_users(req.user?._id?.toString()!, req.params.id);
        res.status(200).json({ status: 'ok', message: 'Successfully registered to tournament' })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const start_tournament = async (req: Request, res: Response) => {
    try {
        const tournament = await update_tournament(req.params.id, { status: 'PROGRESS' });
        
        await create_tree(tournament!.users, tournament?._id.toString()!, true)
        
        res.status(200).json({ tournament })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const finish_tournament = async (req: Request, res: Response) => {
    try {
        await update_tournament(req.params.id, { status: 'FINISH' })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const delete_tournament_by_id = async (req: Request, res: Response) => {
    try {
        const tournament = await find_tournament_by_id(req.params.id)
        if(!tournament) return res.status(404).json({ status: 'warning', message: 'Tournament with this id not exists!' })

        await delete_tournament(req.params.id)

        res.status(200).json({ status: 'ok', message: "Tournament successfully deleted!" })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}