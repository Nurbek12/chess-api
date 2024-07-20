import { Router } from 'express'
import { login, refresh, register } from '../controllers/auth.controller'
import { login_validator, refresh_validator, register_validator } from '../validators/auth.validator'

const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in to the application
 *     description: Authenticate user and return a token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid email or password
 *       422:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh authentication token
 *     description: Obtain a new token using a refresh token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh-token
 *             properties:
 *               refresh-token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully refreshed token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid refresh token
 *       422:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - age
 *               - email
 *               - country
 *               - password
 *               - gender
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               age:
 *                 type: number
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 age:
 *                   type: number
 *                 email:
 *                   type: string
 *                 country:
 *                   type: string
 *                 gender:
 *                   type: string
 *       400:
 *         description: Invalid input data
 *       422:
 *         description: Validation error
 */

router.post('/login', login_validator, login)

router.post('/refresh', refresh_validator, refresh)

router.post('/register', register_validator, register)

export default router

/**
 * @swagger
 * components:
 *  securitySchemas:
 *    apiAuth:
 *      type: apiKey
 *      in: header
 *      name: authorization
 *      
*/