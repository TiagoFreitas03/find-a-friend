import { CreatePetParams, SearchPetsFilters } from '@/models/pet'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create({
    imagesPaths,
    adoptionRequirements,
    orgId,
    ...data
  }: CreatePetParams) {
    const pet = await prisma.pet.create({
      data: {
        ...data,
        org: {
          connect: {
            id: orgId,
          },
        },
        images: {
          createMany: {
            data: imagesPaths.map((path) => {
              return { path }
            }),
          },
        },
        adoptionRequirements: {
          createMany: {
            data: adoptionRequirements.map((description) => {
              return { description }
            }),
          },
        },
      },
    })

    return {
      ...pet,
      images: [],
      adoptionRequirements: [],
    }
  }

  async searchMany({
    state,
    city,
    age,
    energyLevel,
    independencyLevel,
    size,
  }: SearchPetsFilters) {
    const notNull = {
      not: undefined,
    }

    const petsFiltered = await prisma.pet.findMany({
      where: {
        org: {
          state,
          city,
        },
        age: age ?? notNull,
        energyLevel: energyLevel ?? notNull,
        independencyLevel: independencyLevel ?? notNull,
        size: size ?? notNull,
      },
    })

    return petsFiltered
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
