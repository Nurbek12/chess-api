import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { create_new_tournament, delete_tournament_by_id, finish_tournament, get_all_tournaments, start_tournament } from '../controllers/tournament.controller'

const router = Router()

/**
 * @swagger
 * /api/tournaments:
 *   get:
 *     summary: Get all tournaments
 *     description: Retrieve a list of all tournaments.
 *     tags:
 *       - Tournament
 *     security:
 *       - apiAuth: []
 *     responses:
 *       200:
 *         description: A list of tournaments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ITournament'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware(), get_all_tournaments)

/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     summary: Create a new tournament
 *     description: Add a new tournament to the database.
 *     tags:
 *       - Tournament
 *     security:
 *       - apiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ITournament'
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input data
 */
router.post('/', authMiddleware('ADMIN'), create_new_tournament)

/**
 * @swagger
 * /api/tournaments/start/{id}:
 *   put:
 *     summary: Start a tournament
 *     description: Mark a tournament as started.
 *     tags:
 *       - Tournament
 *     security:
 *       - apiAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tournament started successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tournament not found
 */
router.put('/start/:id', authMiddleware('ADMIN'), start_tournament)

/**
 * @swagger
 * /api/tournaments/finish/{id}:
 *   put:
 *     summary: Finish a tournament
 *     description: Mark a tournament as finished.
 *     tags:
 *       - Tournament
 *     security:
 *       - apiAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tournament finished successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tournament not found
 */
router.put('/finish/:id', authMiddleware('ADMIN'), finish_tournament)

/**
 * @swagger
 * /api/tournaments/{id}:
 *   delete:
 *     summary: Delete a tournament
 *     description: Delete a tournament by its ID.
 *     tags:
 *       - Tournament
 *     security:
 *       - apiAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tournament deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tournament not found
 */
router.delete('/:id', authMiddleware('ADMIN'), delete_tournament_by_id)

export default router

/**
 * @swagger
 * components:
 *   schemas:
 *     ITournament:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         users:
 *           type: array
 *           items:
 *             type: string
 *         max_users:
 *           type: number
 *         start_date:
 *           type: string
 *         status:
 *           type: string
 *           enum: [CASTING, PROGRESS, FINISH]
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *   securitySchemes:
 *     apiAuth:
 *       type: apiKey
 *       in: header
 *       name: authorization
 */