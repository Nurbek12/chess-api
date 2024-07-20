import { query } from 'express-validator'

export const pagination_validator = [
    query('page', 'Page query must be number').isNumeric().isEmpty(),
    query('limit', 'Limit query must be number').isNumeric().isEmpty(),
]