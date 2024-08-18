import { Pet } from '@/models/pet'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsParams {
  state: string
  city: string
}

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    state,
    city,
  }: SearchPetsParams): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchManyByLocation(state, city)

    return { pets }
  }
}
