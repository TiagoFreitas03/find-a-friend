import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const orgssRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(orgssRepository)

  return useCase
}
