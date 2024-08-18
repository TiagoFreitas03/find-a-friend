import { CreateOrgParams, Org } from '@/models/org'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsibleName,
    email,
    zipCode,
    address,
    whatsapp,
    password,
    state,
    city,
  }: CreateOrgParams): Promise<CreateOrgResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      responsibleName,
      email,
      zipCode,
      address,
      whatsapp,
      password: passwordHash,
      state,
      city,
    })

    return { org }
  }
}
