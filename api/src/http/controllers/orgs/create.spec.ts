import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create ORG (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a ORG', async () => {
    const response = await request(app.server).post('/orgs').send({
      responsibleName: 'John Doe',
      zipCode: '99999999',
      address: 'example address',
      whatsapp: '99 99999-9999',
      state: 'SP',
      city: 'Sao Paulo',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
