import { body } from 'express-validator'

export const tournament_create_validator = [
    body('title', 'Title fields must be required').isString().not().isEmpty(),
    body('description', 'Description fields must be required').isString().not().isEmpty(),
    body('max_users', 'Max users fields must be required').isNumeric().not().isEmpty(),
    body('start_date', 'Start date fields must be required').isString().not().isEmpty(),
]