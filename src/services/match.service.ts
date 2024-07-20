import { Types } from 'mongoose'
import { Match, IMatch } from '../models/match.model'

export const find_all_matchs = (page: number = 1, limit: number = 10) => {
    return Match.find({}, {},
        { 
            skip: (page-1)*limit,
            limit,
            lean: true,
        }
    )
}

export const count_of_matchs = () => {
    return Match.countDocuments()
}

export const find_tree_by_tournament = (id: string) => {
    return Match.aggregate([
        {
            $match: { tournament: new Types.ObjectId(id) }
        },
        {
            $sort: {
                index_of_tree: 1
            }
        },
        {
            $group: {
                _id: '$level_of_tree',
                matchs: { $push: "$$ROOT" }
            }
        }
    ])
}

export const find_match_by_id = (id: string) => {
    return Match.findById(id, {}, { lean: true })
}

export const create_match = (matchData: Partial<IMatch>) => {
    return Match.create(matchData)
}

export const update_match = (id: string, matchData: Partial<IMatch>) => {
    return Match.findByIdAndUpdate(id, { $set: matchData }, { lean: true, new: true })
}

export const delete_match = (id: string) => {
    return Match.findByIdAndDelete(id)
}