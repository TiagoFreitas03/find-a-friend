export interface CreateOrgParams {
  responsibleName: string | null
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
  state: string
  city: string
}

export interface Org extends CreateOrgParams {
  id: string
}
