import { model, Schema, Types } from 'mongoose'

export interface IMatch {
    _id?: Types.ObjectId

    tournament: Schema.Types.ObjectId
    users: Schema.Types.ObjectId[],
    winner?: Schema.Types.ObjectId
    date: string
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISH'
    start_time?: string
    end_time?: string
    level_of_tree: number
    index_of_tree: number

    createdAt?: Date
    updatedAt?: Date
}

export const Match = model<IMatch>('internship-chess-matchs', new Schema({
    tournament: {
        type: Schema.Types.ObjectId,
        ref: 'internship-chess-tournaments'
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'internship-chess-users'
    }],
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'internship-chess-users'
    },
    date: {
        type: String,
    },
    status: {
        type: String,
        enum: ['NOT_STARTED', 'IN_PROGRESS', 'FINISH'],
        default: 'NOT_STARTED'
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    level_of_tree: {
        type: Number
    },
    index_of_tree: {
        type: Number
    }
}, {
    timestamps: true
}))