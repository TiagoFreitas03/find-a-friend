import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    age: z.string().optional(),
    energyLevel: z.string().optional(),
    independencyLevel: z.string().optional(),
    size: z.string().optional(),
  })

  const { city, state, age, energyLevel, independencyLevel, size } =
    searchPetsQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    state,
    age,
    energyLevel,
    independencyLevel,
    size,
  })

  return reply.status(200).send({ pets })
}
