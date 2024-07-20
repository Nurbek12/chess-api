import app from '..'
import request from 'supertest'
import { token, match_data, updated_match_data } from './data/match.data'

let match_id = ''

describe('Match Controller', () => {
    describe('GET /api/matches', () => {
        test('Should return all matches', async () => request(app)
            .get('/api/matches')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
            })
        )
    })

    describe('GET /api/matches/tree/:id', () => {
        test('Should return matches by tree ID', async () => request(app)
            .get('/api/matches/tree/123') // Replace with a valid tree ID if necessary
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
            })
        )
    })

    describe('PUT /api/matches/start/:id', () => {
        test('Should start a match by ID', async () => request(app)
            .put(`/api/matches/start/${match_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', match_id)
                expect(response.body).toHaveProperty('status', 'IN_PROGRESS')
            })
        )
    })

    describe('PUT /api/matches/finish/:id', () => {
        test('Should finish a match by ID', async () => request(app)
            .put(`/api/matches/finish/${match_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', match_id)
                expect(response.body).toHaveProperty('status', 'FINISH')
            })
        )
    })

    describe('PUT /api/matches/:id', () => {
        test('Should update a match by ID', async () => request(app)
            .put(`/api/matches/${match_id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updated_match_data)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', match_id)
                expect(response.body).toHaveProperty('status', updated_match_data.status)
            })
        )
    })

    describe('DELETE /api/matches/:id', () => {
        test('Should delete a match by ID', async () => request(app)
            .delete(`/api/matches/${match_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', match_id)
            })
        )
    })
})