import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets by location', async () => {
    const pet = {
      about: 'Sobre',
      age: 'Filhote',
      size: 'Pequenino',
      energyLevel: 'Baixo',
      independencyLevel: 'Baixo (precisa de companhia sempre)',
      environmentRequired: 'Ambiente Amplo',
      imagesPaths: [],
      adoptionRequirements: [],
    }

    await petsRepository.create({
      ...pet,
      name: 'Jacarei Pet',
      orgId: 'org-01',
      org: {
        id: 'org-01',
        state: 'SP',
        city: 'Jacarei',
      },
    })

    await petsRepository.create({
      ...pet,
      name: 'Sao Paulo Pet',
      orgId: 'org-02',
      org: {
        id: 'org-02',
        state: 'SP',
        city: 'Sao Paulo',
      },
    })

    const { pets } = await sut.execute({
      state: 'SP',
      city: 'Jacarei',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Jacarei Pet' })])
  })
})
