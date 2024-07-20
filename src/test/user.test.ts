import app from '..'
import request from 'supertest'
import { token, user_data, updated_user_data } from './data/user.data'

let user_id = ''

describe('User Controller', () => {
    describe('GET /api/users', () => {
        test('Should return all users', async () => request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
            })
        )
    })
    
    describe('GET /api/users/leaderboard', () => {
        test('Should return the leaderboard', async () => request(app)
            .get('/api/users/leaderboard')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
            })
        )
    })
    
    describe('GET /api/users/id/:id', () => {
        test('Should return user by ID', async () => request(app)
            .get(`/api/users/id/${user_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', user_id)
            })
        )
    })
    
    describe('POST /api/users', () => {
        test('Should register a new user', async () => request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send(user_data)
            .expect(201)
            .then((response) => {
                expect(response.body).toHaveProperty('_id')
                user_id = response.body._id
            })
        )
    })
    
    describe('PUT /api/users/:id', () => {
        test('Should update user by ID', async () => request(app)
            .put(`/api/users/${user_id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updated_user_data)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', user_id)
                expect(response.body).toHaveProperty('first_name', updated_user_data.first_name)
            })
        )
    })
    
    describe('DELETE /api/users/:id', () => {
        test('Should delete user by ID', async () => request(app)
            .delete(`/api/users/${user_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', user_id)
            })
        )
    })
})