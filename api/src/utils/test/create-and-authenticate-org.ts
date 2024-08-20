import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  city = 'Sao Paulo',
  state = 'SP',
  email = 'johndoe@example.com',
) {
  await prisma.org.create({
    data: {
      responsibleName: 'John Doe',
      email,
      password: await hash('123456', 6),
      address: 'Example',
      city,
      state,
      whatsapp: '99 99999-9999',
      zipCode: '99999999',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
