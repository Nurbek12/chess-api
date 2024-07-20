import { Torunament, ITournament } from '../models/tournament.model'

export const find_all_tournaments = (page: number = 1, limit: number = 10) => {
    return Torunament.find({}, {},
        { 
            skip: (page-1)*limit,
            limit,
            lean: true,
        }
    )
}

export const count_of_tournaments = () => {
    return Torunament.countDocuments()
}

export const find_tournament_by_id = (id: string) => {
    return Torunament.findById(id, {}, { lean: true })
}

export const create_tournament = (tournamentData: ITournament) => {
    return Torunament.create(tournamentData)
}

export const update_tournament = (id: string, tournamentData: Partial<ITournament>) => {
    return Torunament.findByIdAndUpdate(id, { $set: tournamentData }, { lean: true, new: true })
}

export const delete_tournament = (id: string) => {
    return Torunament.findByIdAndDelete(id)
}

export const push_to_users = (userid: string, tournamentid: string) => {
    return Torunament.findByIdAndUpdate(tournamentid, { $push: { users: userid }  }, { lean: true, new: true })
}

export const remove_from_users = (userid: string, tournamentid: string) => {
    return Torunament.findByIdAndUpdate(tournamentid, { $pull: { users: userid } }, { lean: true, new: true })
}