import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '../orgs-repository'
import { CreateOrgParams } from '@/models/org'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: CreateOrgParams) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }
}
