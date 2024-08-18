import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const { pet } = await sut.execute({
      name: 'Pet-01',
      about: 'Sobre Pet-01',
      age: 'Filhote',
      size: 'Pequenino',
      energyLevel: 'Baixo',
      independencyLevel: 'Baixo (precisa de companhia sempre)',
      environmentRequired: 'Ambiente Amplo',
      orgId: 'org-01',
      imagesPaths: [],
      adoptionRequirements: [],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
