import { Pet, SearchPetsFilters } from '@/models/pet'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsParams extends SearchPetsFilters {}

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    state,
    city,
    age,
    energyLevel,
    size,
    independencyLevel,
  }: SearchPetsParams): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchManyByLocation({
      state,
      city,
      age,
      energyLevel,
      size,
      independencyLevel,
    })

    return { pets }
  }
}
