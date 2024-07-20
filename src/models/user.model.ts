import { model, Schema, Types } from 'mongoose'

export interface IUser {
    _id?: Types.ObjectId
    
    first_name: string
    last_name: string
    email: string
    password: string
    age: number
    country: string
    rate?: number
    gender: 'MALE' | 'FEMALE'
    role?: 'ADMIN' | 'PLAYER'

    createdAt?: Date
    updatedAt?: Date
}

export const User = model<IUser>('internship-chess-users', new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        required: true,
    },
    rate: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['ADMIN', 'PLAYER'],
        default: 'PLAYER'
    },
}, {
    timestamps: true
}))