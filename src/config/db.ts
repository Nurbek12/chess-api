import { connect } from 'mongoose'
import { MONGODB_URI } from './keys'

export const connect_to_db = async () => connect(MONGODB_URI!)
    .then(() => console.log('Database connected to app..'))
    .catch((err) => console.log('Error with connecting', err))