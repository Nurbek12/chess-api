import app from '..'
import request from 'supertest'
import { token, tournament_data, updated_tournament_data } from './data/tournament.data'

let tournament_id = ''

describe('Tournament Controller', () => {
    describe('GET /api/tournaments', () => {
        test('Should return all tournaments', async () => request(app)
            .get('/api/tournaments')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
            })
        )
    })
    
    describe('POST /api/tournaments', () => {
        test('Should create a new tournament', async () => request(app)
            .post('/api/tournaments')
            .set('Authorization', `Bearer ${token}`)
            .send(tournament_data)
            .expect(201)
            .then((response) => {
                expect(response.body).toHaveProperty('_id')
                tournament_id = response.body._id
            })
        )
    })
    
    describe('PUT /api/tournaments/start/:id', () => {
        test('Should start a tournament by ID', async () => request(app)
            .put(`/api/tournaments/start/${tournament_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', tournament_id)
                expect(response.body).toHaveProperty('status', 'PROGRESS')
            })
        )
    })
    
    describe('PUT /api/tournaments/finish/:id', () => {
        test('Should finish a tournament by ID', async () => request(app)
            .put(`/api/tournaments/finish/${tournament_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', tournament_id)
                expect(response.body).toHaveProperty('status', 'FINISH')
            })
        )
    })
    
    describe('DELETE /api/tournaments/:id', () => {
        test('Should delete a tournament by ID', async () => request(app)
            .delete(`/api/tournaments/${tournament_id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id', tournament_id)
            })
        )
    })
})