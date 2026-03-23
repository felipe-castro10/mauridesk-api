export class TicketIsResolved extends Error {
  constructor() {
    super('This ticket has resolved')
  }
}
