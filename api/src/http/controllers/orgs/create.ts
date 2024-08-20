import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    responsibleName: z.string().nullable(),
    email: z.string().email(),
    password: z.string().min(6),
    zipCode: z.string().length(8),
    address: z.string(),
    whatsapp: z.string(),
    state: z.string().length(2),
    city: z.string(),
  })

  const {
    responsibleName,
    email,
    password,
    zipCode,
    address,
    whatsapp,
    state,
    city,
  } = createOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      responsibleName,
      email,
      password,
      zipCode,
      address,
      whatsapp,
      state,
      city,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
