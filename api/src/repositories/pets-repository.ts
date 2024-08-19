import { CreatePetParams, Pet, SearchPetsFilters } from '@/models/pet'

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
  searchMany(filters: SearchPetsFilters): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
