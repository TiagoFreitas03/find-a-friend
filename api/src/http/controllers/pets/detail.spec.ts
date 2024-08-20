import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    await createAndAuthenticateOrg(app)

    const { id: orgId } = await prisma.org.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        name: 'Example',
        about: 'Example',
        age: 'Puppy',
        size: 'Small',
        energyLevel: '5',
        independencyLevel: '5',
        environmentRequired: 'Large',
        orgId,
      },
    })

    const petDetailsResponse = await request(app.server)
      .get(`/pets/${pet.id}`)
      .send()

    expect(petDetailsResponse.statusCode).toEqual(200)
    expect(petDetailsResponse.body.pet).toEqual(
      expect.objectContaining({
        name: 'Example',
      }),
    )
  })
})
