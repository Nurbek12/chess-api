import { body } from 'express-validator'

export const login_validator = [
    body('email', 'Email fields must be required').isString().not().isEmpty(),
    body('password', 'Email fields must be required').isString().not().isEmpty(),
]

export const register_validator = [
    body('email', 'Email fields must be required').isString().not().isEmpty(),
    body('password', 'Password fields must be required').isString().not().isEmpty(),
    body('first_name', 'First name fields must be required').isString().not().isEmpty(),
    body('last_name', 'Last name fields must be required').isString().not().isEmpty(),
    body('age', 'Age fields must be required').isNumeric().not().isEmpty(),
    body('country', 'Country fields must be required').isString().not().isEmpty(),
    body('gender', 'Gender fields must be required').isString().not().isEmpty(),
]

export const refresh_validator = [
    body('refresh_token', 'Refresh token fields must be required').isString().not().isEmpty(),
]