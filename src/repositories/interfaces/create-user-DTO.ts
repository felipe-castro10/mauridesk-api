export interface CreateUserDTO {
  name: string
  email: string
  password_hash: string
  type_user: string
  branch_id?: string | null
}
