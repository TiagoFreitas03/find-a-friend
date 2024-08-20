import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { detail } from './detail'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.get('/pets/:petId', detail)
  app.get('/pets', search)
}
