import { CreatePetParams, Pet } from '@/models/pet'

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
}
