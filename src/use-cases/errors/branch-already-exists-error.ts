export class BranchAlreadyExistsError extends Error {
  constructor() {
    super('CNPJ already exists.')
  }
}
