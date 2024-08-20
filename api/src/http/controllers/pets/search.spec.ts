import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by location', async () => {
    let { token } = await createAndAuthenticateOrg(
      app,
      'Jacarei',
      'SP',
      'org1@exmaple.com',
    )

    await request(app.server)
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

    token = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet 2',
        about: 'Example',
        age: 'Puppy',
        size: 'Small',
        energyLevel: '5',
        independencyLevel: '5',
        environmentRequired: 'Large',
        imagesPaths: [],
        adoptionRequirements: [],
      })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Jacarei',
        state: 'SP',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Pet 1',
      }),
    ])
  })
})
