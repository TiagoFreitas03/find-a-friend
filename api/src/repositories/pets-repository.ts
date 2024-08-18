import { CreatePetParams, Pet } from '@/models/pet'

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
  searchManyByLocation(state: string, city: string): Promise<Pet[]>
}
