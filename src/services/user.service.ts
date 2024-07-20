import { User, IUser } from '../models/user.model'

export const find_all_users = (page: number = 1, limit: number = 10, search?: string) => {
    let search_pattern: any = {}
    if(search?.trim()) search_pattern = { 
        $or: [
            { first_name: { $regex: search, $options: 'i' } },
            { last_name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ]
    }
    return User.find(
        search_pattern,
        {},
        { 
            skip: (page-1)*limit,
            limit,
            lean: true,
        }
    )
}

export const count_of_users = (search?: string) => {
    let search_pattern: any = {}
    if(search?.trim()) search_pattern = { 
        $or: [
            { first_name: { $regex: search, $options: 'i' } },
            { last_name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ]
    }
    return User.countDocuments(search_pattern)
}

export const find_user_by_options = (key: '_id' | 'email', value: string) => {
    return User.findOne({ [key]: value }, {}, { lean: true })
}

export const create_user = (userData: Partial<IUser>) => {
    return User.create(userData)
}

export const update_user = (id: string, userData: Partial<IUser>) => {
    return User.findByIdAndUpdate(id, { $set: userData }, { lean: true, new: true })
}

export const up_user_rate = (id: string, rate: number) => {
    return User.findByIdAndUpdate(id, { $inc: { rate } }, { lean: true, new: true })
}

export const delete_user = (id: string) => {
    return User.findByIdAndDelete(id)
}

export const get_leaders = () => {
    return User.find({ role: 'PLAYER' })
        .sort('-rate')
        .select('first_name, last_name, email, age, country, rate, gender')
        .limit(10)
        .lean()
}