import { Pet } from '@/models/pet'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsParams {
  petId: string
}

interface GetPetDetailsResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsParams): Promise<GetPetDetailsResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
