import { Org } from './org'

interface BasePetModel {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  independencyLevel: string
  environmentRequired: string
  orgId: string
  org?: Org
}

export interface CreatePetParams extends BasePetModel {
  id?: string
  imagesPaths: string[]
  adoptionRequirements: string[]
}

interface PetImage {
  id: number
  path: string
}

interface PetAdoptionRequirements {
  id: number
  description: string
}

export interface Pet extends BasePetModel {
  id: string
  images: PetImage[]
  adoptionRequirements: PetAdoptionRequirements[]
}

export interface SearchPetsFilters {
  state: string
  city: string
  age?: string
  energyLevel?: string
  size?: string
  independencyLevel?: string
}
