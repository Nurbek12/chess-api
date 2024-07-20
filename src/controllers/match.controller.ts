import { Request, Response } from 'express'
import { create_tree } from './tournament.controller'
import { up_user_rate } from '../services/user.service'
import { find_tournament_by_id, update_tournament } from '../services/tournament.service'
import { count_of_matchs, delete_match, find_all_matchs, find_match_by_id, update_match, find_tree_by_tournament } from '../services/match.service'

export const get_all_matchs = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        
        const [matchs, count] = await Promise.all([
            find_all_matchs(page, limit),
            count_of_matchs()
        ])

        res.status(200).json({ matchs, count, page, limit })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const get_tree_matchs = async (req: Request, res: Response) => {
    try {
        const matchs = await find_tree_by_tournament(req.params.id)

        res.status(200).json({ matchs })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const start_match = async (req: Request, res: Response) => {
    try {
        await update_match(req.params.id, {
            status: 'IN_PROGRESS',
            start_time: new Date().toLocaleTimeString()
        })

        res.status(200).json({ status: 'ok', message: 'Successfully started matchs!' })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const finish_match = async (req: Request, res: Response) => {
    try {
        const match = await update_match(req.params.id, {
            winner: req.body.winner,
            status: 'FINISH',
            end_time: new Date().toLocaleTimeString()
        })

        await up_user_rate(req.body.winner, 3)

        if(match!.level_of_tree/2 === match!.index_of_tree) {
            const tournamet = await find_tournament_by_id(match?.tournament as any)
            
            await create_tree(tournamet!.users, tournamet!._id.toString(), false)   
        }

        if(match?.level_of_tree === 1)
            await update_tournament(match?.tournament as any, { status: 'FINISH' })

        res.status(200).json({ status: 'ok', message: 'Successfully finished matchs!' })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const update_match_by_id = async (req: Request, res: Response) => {
    try {
        const match = await update_match(req.params.id, req.body)

        res.status(200).json({ match })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}

export const delete_match_by_id = async (req: Request, res: Response) => {
    try {
        const match = await find_match_by_id(req.params.id)
        if(!match) return res.status(404).json({ status: 'warning', message: 'Match with this id not exists!' })

        await delete_match(req.params.id)

        res.status(200).json({ status: 'ok', message: "Match successfully deleted!" })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
    }
}