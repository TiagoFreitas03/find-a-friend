import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function detail(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetails = makeGetPetDetailsUseCase()

  const { pet } = await getPetDetails.execute({ petId })

  return reply.status(200).send({ pet })
}
