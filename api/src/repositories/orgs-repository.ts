import { CreateOrgParams, Org } from '@/models/org'

export interface OrgsRepository {
  create(data: CreateOrgParams): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
}
