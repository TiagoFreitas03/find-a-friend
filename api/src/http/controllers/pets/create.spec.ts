import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet 1',
        about: 'Example',
        age: 'Puppy',
        size: 'Small',
        energyLevel: '5',
        independencyLevel: '5',
        environmentRequired: 'Large',
        imagesPaths: [],
        adoptionRequirements: [],
      })

    expect(response.statusCode).toEqual(201)
  })
})
