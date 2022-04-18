import request from 'supertest'
import app from '../config/app'

describe('Lists Routes', () => {
  it('should return all lists on success', async () => {
    await request(app).get('/api/lists').expect(200)
  })
})
