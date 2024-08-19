import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      address: 'Rua teste',
      city: 'Jacarei',
      state: 'SP',
      email: 'org@example.com',
      password: await hash('123456', 6),
      whatsapp: '99 99999-9999',
      zipCode: '99999999',
      responsibleName: null,
    })

    const { org } = await sut.execute({
      email: 'org@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'inexistent-org@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      address: 'Rua teste',
      city: 'Jacarei',
      state: 'SP',
      email: 'org@example.com',
      password: await hash('123456', 6),
      whatsapp: '99 99999-9999',
      zipCode: '99999999',
      responsibleName: null,
    })

    await expect(() =>
      sut.execute({
        email: 'org@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
