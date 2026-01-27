export class BranchNotExistsError extends Error {
  constructor() {
    super('Branch not exists')
  }
}
