import request from 'supertest'
import app from '../config/app'

describe('GET Lists Route', () => {
  it('should return all lists on success', async () => {
    await request(app).get('/api/lists').expect(200)
  })
})

describe('POST Lists Route', () => {
  it('should return an id on success', async () => {
    const httpResponse = await request(app)
      .post('/api/lists')
      .send({ title: 'any_title', description: 'any_description' })
      .expect(200)

    expect(typeof httpResponse.body).toBe('string')
  })

  it('should return 400 if invalid body is provided', async () => {
    const httpResponse = await request(app)
      .post('/api/lists')
      .send({ description: 'any_description' })
      .expect(400)

    expect(httpResponse.body).toEqual({ error: 'Missing field: title' })
  })
})
