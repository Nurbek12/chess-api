import { Router } from 'express'
import { register } from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { delete_user_by_id, get_all_users, update_user_by_id, get_by_id, get_leaderboard } from '../controllers/user.controller'

const router = Router()

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - User
 *     security:
 *       - apiAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IUser'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware('ADMIN'), get_all_users)

/**
 * @swagger
 * /api/users/leaderboard:
 *   get:
 *     summary: Get leaderboard
 *     description: Retrieve the leaderboard of users.
 *     tags:
 *       - User
 *     security:
 *       - apiAuth: []
 *     responses:
 *       200:
 *         description: The leaderboard of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IUser'
 *       401:
 *         description: Unauthorized
 */
router.get('/leaderboard', authMiddleware(), get_leaderboard)

/**
 * @swagger
 * /api/users/id/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID.
 *     tags:
 *       - User
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
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IUser'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/id/:id', authMiddleware('ADMIN'), get_by_id)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     description: Add a new user to the database.
 *     tags:
 *       - User
 *     security:
 *       - apiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input data
 */
router.post('/', authMiddleware('ADMIN'), register)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user's details by their ID.
 *     tags:
 *       - User
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
 *             $ref: '#/components/schemas/IUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/:id', authMiddleware('ADMIN'), update_user_by_id)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user from the database by their ID.
 *     tags:
 *       - User
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
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/:id', authMiddleware('ADMIN'), delete_user_by_id)

export default router


/**
 * @swagger
 * components:
 *   schemas:
 *     IUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         age:
 *           type: integer
 *         country:
 *           type: string
 *         rate:
 *           type: number
 *         gender:
 *           type: string
 *           enum: [MALE, FEMALE]
 *         role:
 *           type: string
 *           enum: [ADMIN, PLAYER]
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