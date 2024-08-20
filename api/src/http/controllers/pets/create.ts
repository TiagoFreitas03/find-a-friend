import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    independencyLevel: z.string(),
    environmentRequired: z.string(),
    imagesPaths: z.array(z.string()),
    adoptionRequirements: z.array(z.string()),
  })

  const { sub: orgId } = request.user.sign

  const {
    name,
    about,
    age,
    size,
    energyLevel,
    independencyLevel,
    environmentRequired,
    imagesPaths,
    adoptionRequirements,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energyLevel,
    independencyLevel,
    environmentRequired,
    orgId,
    imagesPaths,
    adoptionRequirements,
  })

  return reply.status(201).send()
}
