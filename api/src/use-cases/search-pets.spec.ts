import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

const exampleOrgData = {
  id: '',
  address: '',
  email: '',
  password: '',
  responsibleName: '',
  whatsapp: '',
  zipCode: '',
  state: '',
  city: '',
}

const examplePetData = {
  id: '',
  name: '',
  orgId: '',
  about: '',
  age: '',
  size: '',
  energyLevel: '',
  independencyLevel: '',
  environmentRequired: '',
  imagesPaths: [],
  adoptionRequirements: [],
  org: exampleOrgData,
}

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets by location', async () => {
    petsRepository.items.push({
      ...examplePetData,
      name: 'Pet Jacarei',
      org: {
        ...exampleOrgData,
        state: 'SP',
        city: 'Jacarei',
      },
    })

    petsRepository.items.push({
      ...examplePetData,
      name: 'Pet Sao Paulo',
      org: {
        ...exampleOrgData,
        state: 'SP',
        city: 'Sao Paulo',
      },
    })

    const { pets } = await sut.execute({
      state: 'SP',
      city: 'Jacarei',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Pet Jacarei' })])
  })

  it('should be able to filter pets by their characteristics', async () => {
    petsRepository.items.push({
      ...examplePetData,
      name: 'Large Pet',
      size: 'Grande',
      org: {
        ...exampleOrgData,
        state: 'SP',
        city: 'Jacarei',
      },
    })

    petsRepository.items.push({
      ...examplePetData,
      name: 'Small Pet',
      size: 'Grande',
      org: {
        ...exampleOrgData,
        state: 'SP',
        city: 'Jacarei',
      },
    })

    const { pets } = await sut.execute({
      state: 'SP',
      city: 'Jacarei',
      size: 'Grande',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Large Pet' })])
  })
})
