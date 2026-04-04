import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTicketsRepository } from '@/repositories/in-memory/in-memory-tickets-repository'
import { CreateTicketUseCase } from './create-ticket'

let ticketsRepository: InMemoryTicketsRepository
let sut: CreateTicketUseCase

describe('Create Ticket Use Case', () => {
  beforeEach(() => {
    ticketsRepository = new InMemoryTicketsRepository()
    sut = new CreateTicketUseCase(ticketsRepository)
  })

  it('should be able to create ticket', async () => {
    const { ticket } = await sut.execute({
      title: 'teste',
      description: 'teste',
      category: 'category',
      department: 'department teste',
      status: 'OPEN',
      priority: 'low',
      creator_id: 'user-id',
      branch_id: 'branch-id',
    })

    expect(ticket.id).toEqual(expect.any(String))
  })
})
