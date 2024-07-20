import { Router } from 'express'
import authRoute from './auth.route'
import userRoute from './user.route'
import matchRoute from './match.route'
import tournamentRoute from './tournament.route'

const router = Router()

router.use('/auth', authRoute)

router.use('/api/users', userRoute)

router.use('/api/matchs', matchRoute)

router.use('/api/tournaments', tournamentRoute)

export default router