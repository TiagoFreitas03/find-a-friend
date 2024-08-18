import { CreateOrgParams, Org } from '@/models/org'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: CreateOrgParams) {
    const org = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    return org ?? null
  }
}
