import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a ORG', async () => {
    const { org } = await sut.execute({
      address: 'Rua teste',
      city: 'Jacarei',
      state: 'SP',
      email: 'org@example.com',
      password: '123456',
      whatsapp: '99 99999-9999',
      zipCode: '99999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      address: 'Rua teste',
      city: 'Jacarei',
      state: 'SP',
      email: 'org@example.com',
      password: '123456',
      whatsapp: '99 99999-9999',
      zipCode: '99999999',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'org@example.com'

    await sut.execute({
      address: 'Rua teste',
      city: 'Jacarei',
      state: 'SP',
      email,
      password: '123456',
      whatsapp: '99 99999-9999',
      zipCode: '99999999',
    })

    await expect(() =>
      sut.execute({
        address: 'Rua teste',
        city: 'Jacarei',
        state: 'SP',
        email,
        password: '123456',
        whatsapp: '99 99999-9999',
        zipCode: '99999999',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
