import app from '..'
import request from 'supertest'
import { register_data, login_data } from './data/auth.data'

let refresh_token = ''

describe('Auth Controller', () => {
    describe('POST /auth/register', () => {
        test('Should create new player user', async () => request(app)
            .post('/auth/register')
            .send(register_data)
            .expect(200)
            .then(() => {})
        )
    })
    
    describe('POST /auth/login', () => {
        test('Should returned user data and tokens', async () => request(app)
            .post('/auth/login')
            .send(login_data)
            .expect(200)
            .then(({body}) => {
                refresh_token = body.refresh_token
            })
        )
    })
    
    describe('POST /auth/refresh', () => {
        test('Should create new player user', async () => request(app)
            .post('/auth/refresh')
            .send({ refresh_token })
            .expect(200)
            .then(() => {})
        )
    })
})
