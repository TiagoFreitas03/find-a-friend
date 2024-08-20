import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const orgssRepository = new PrismaOrgsRepository()
  const useCase = new CreateOrgUseCase(orgssRepository)

  return useCase
}
