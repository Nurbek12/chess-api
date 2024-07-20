import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { delete_match_by_id, finish_match, get_all_matchs, get_tree_matchs, start_match, update_match_by_id } from '../controllers/match.controller'

const router = Router()

/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Get all matches
 *     description: Retrieve a list of all matches.
 *     tags:
 *       - Match
 *     security:
 *       - apiAuth: []
 *     responses:
 *       200:
 *         description: A list of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IMatch'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware(), get_all_matchs)

/**
 * @swagger
 * /api/matches/tree/{id}:
 *   get:
 *     summary: Get match tree
 *     description: Retrieve the match tree for a specific match.
 *     tags:
 *       - Match
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
 *         description: The match tree
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IMatch'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Match not found
 */
router.get('/tree/:id', authMiddleware(), get_tree_matchs)

/**
 * @swagger
 * /api/matches/start/{id}:
 *   put:
 *     summary: Start a match
 *     description: Mark a match as started.
 *     tags:
 *       - Match
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
 *         description: Match started successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Match not found
 */
router.put('/start/:id', authMiddleware(), start_match)

/**
 * @swagger
 * /api/matches/finish/{id}:
 *   put:
 *     summary: Finish a match
 *     description: Mark a match as finished.
 *     tags:
 *       - Match
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
 *         description: Match finished successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Match not found
 */
router.put('/finish/:id', authMiddleware(), finish_match)

/**
 * @swagger
 * /api/matches/{id}:
 *   put:
 *     summary: Update a match
 *     description: Update a match by its ID.
 *     tags:
 *       - Match
 *     security:
 *       - apiAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IMatch'
 *     responses:
 *       200:
 *         description: Match updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Match not found
 */
router.put('/:id', authMiddleware('ADMIN'), update_match_by_id)

/**
 * @swagger
 * /api/matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     description: Delete a match by its ID.
 *     tags:
 *       - Match
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
 *         description: Match deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Match not found
 */
router.delete('/:id', authMiddleware('ADMIN'), delete_match_by_id)

/**
 * @swagger
 * components:
 *   schemas:
 *     IMatch:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tournament:
 *           type: string
 *         users:
 *           type: array
 *           items:
 *             type: string
 *         winner:
 *           type: string
 *         date:
 *           type: string
 *         status:
 *           type: string
 *           enum: [NOT_STARTED, IN_PROGRESS, FINISH]
 *         start_time:
 *           type: string
 *         end_time:
 *           type: string
 *         level_of_tree:
 *           type: number
 *         index_of_tree:
 *           type: number
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
export default router