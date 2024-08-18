import { CreatePetParams, Pet, SearchPetsFilters } from '@/models/pet'

export interface PetsRepository {
  create(data: CreatePetParams): Promise<Pet>
  searchManyByLocation(filters: SearchPetsFilters): Promise<Pet[]>
}
