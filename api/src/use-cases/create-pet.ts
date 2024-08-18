import { CreatePetParams, Pet } from '@/models/pet'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
    name,
    about,
    age,
    size,
    energyLevel,
    independencyLevel,
    environmentRequired,
    orgId,
    imagesPaths,
    adoptionRequirements,
  }: CreatePetParams): Promise<CreatePetResponse> {
    const pet = await this.petsRepository.create({
      id,
      name,
      about,
      age,
      size,
      energyLevel,
      independencyLevel,
      environmentRequired,
      orgId,
      imagesPaths,
      adoptionRequirements,
    })

    return { pet }
  }
}
