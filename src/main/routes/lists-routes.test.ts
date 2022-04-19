import request from 'supertest'
import app from '../config/app'

describe('GET Lists Route', () => {
  it('should return all lists on success', async () => {
    await request(app).get('/api/lists').expect(200)
  })
})

describe('POST Lists Route', () => {
  it('should return all lists on success', async () => {
    const httpResponse = await request(app)
      .post('/api/lists')
      .send({ title: 'any_title', description: 'any_description' })
      .expect(200)

    expect(typeof httpResponse.body).toBe('string')
    console.log(httpResponse.body)
  })
})
