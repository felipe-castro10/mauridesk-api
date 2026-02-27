export class TicketNotExistsError extends Error {
  constructor() {
    super('Ticket not exists')
  }
}
