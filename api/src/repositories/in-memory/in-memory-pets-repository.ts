import { randomUUID } from 'node:crypto'
import { CreatePetParams, Pet } from '@/models/pet'
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

    return pet
  }
}
