import { model, Schema, Types } from 'mongoose'

export interface ITournament {
    _id?: Types.ObjectId

    title: string
    description: string
    users: Schema.Types.ObjectId[],
    max_users: number
    start_date: string
    status: 'CASTING' | 'PROGRESS' | 'FINISH'

    createdAt?: Date
    updatedAt?: Date
}

export const Torunament = model('internship-chess-tournaments', new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'internship-chess-users'
    }],
    max_users: {
        type: Number,
        required: true
    },
    start_date: {
        type: String,
    },
    status: {
        type: String,
        enum: ['CASTING', 'PROGRESS', 'FINISH'],
        default: 'CASTING'
    }
}, {
    timestamps: true
}))