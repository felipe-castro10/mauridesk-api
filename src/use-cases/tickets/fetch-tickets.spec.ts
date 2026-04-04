import { InMemoryTicketsRepository } from '@/repositories/in-memory/in-memory-tickets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchTicketUseCase } from './fetch-tickets'
import { randomUUID } from 'node:crypto'

let ticketRepository: InMemoryTicketsRepository
let sut: FetchTicketUseCase

describe('Fetch Tickets Use Case', () => {
  beforeEach(() => {
    ticketRepository = new InMemoryTicketsRepository()
    sut = new FetchTicketUseCase(ticketRepository)

    ticketRepository.items.push(
      {
        id: randomUUID(),
        title: 'teste',
        description: 'teste',
        category: 'category',
        department: 'department teste',
        status: 'OPEN',
        priority: 'low',
        creator_id: 'user-id2',
        branch_id: 'branch-id',
        created_at: new Date(),
        updated_at: new Date(),
        technician_id: null,
        first_response_at: null,
        closed_at: null,
        resolved_at: null,
        sla_due_at: new Date(),
        sla_violated: true,
      },
      {
        id: randomUUID(),
        title: 'teste2',
        description: 'teste2',
        category: 'category',
        department: 'department teste',
        status: 'OPEN',
        priority: 'low',
        creator_id: 'user-id',
        branch_id: 'branch-id',
        created_at: new Date(),
        updated_at: new Date(),
        technician_id: null,
        first_response_at: null,
        closed_at: null,
        resolved_at: null,
        sla_due_at: new Date(),
        sla_violated: true,
      },
    )
  })

  it('Should be able to fetch all tickets', async () => {
    const { tickets } = await sut.execute({
      user_id: '',
      role: 'TECH',
    })

    expect(tickets).toEqual([
      expect.objectContaining({ title: 'teste' }),
      expect.objectContaining({ title: 'teste2' }),
    ])
  })

  it('Should be able to list ticket created by user', async () => {
    const { tickets } = await sut.execute({
      user_id: 'user-id',
      role: 'CLIENT',
      filters: { status: 'OPEN' },
    })
    expect(tickets).toHaveLength(1)
  })
})
