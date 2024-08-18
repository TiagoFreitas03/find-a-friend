import { randomUUID } from 'node:crypto'
import { CreatePetParams, Pet, SearchPetsFilters } from '@/models/pet'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: CreatePetParams) {
    const pet: Pet = {
      ...data,
      id: data.id ?? randomUUID(),
      images: data.imagesPaths.map((imagePath, index) => {
        return {
          id: index,
          path: imagePath,
        }
      }),
      adoptionRequirements: data.adoptionRequirements.map(
        (description, index) => {
          return {
            id: index,
            description,
          }
        },
      ),
    }

    this.items.push(pet)

    return pet
  }

  async searchManyByLocation({ state, city, ...filters }: SearchPetsFilters) {
    let petsFiltered = this.items.filter((pet) => {
      return pet.org?.state === state && pet.org?.city === city
    })

    if (filters.age) {
      petsFiltered = petsFiltered.filter((pet) => pet.age === filters.age)
    }

    if (filters.energyLevel) {
      petsFiltered = petsFiltered.filter(
        (pet) => pet.energyLevel === filters.energyLevel,
      )
    }

    if (filters.size) {
      petsFiltered = petsFiltered.filter((pet) => pet.size === filters.size)
    }

    if (filters.independencyLevel) {
      petsFiltered = petsFiltered.filter(
        (pet) => pet.independencyLevel === filters.independencyLevel,
      )
    }

    return petsFiltered
  }
}
