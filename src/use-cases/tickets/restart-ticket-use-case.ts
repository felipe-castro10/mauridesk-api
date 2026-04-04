import type { TicketsRepository } from "@/repositories/tickets-repository";
import type { Ticket } from "@prisma/client";
import { TicketIsResolved } from "../errors/ticket-is-resolved";


interface RestartTicketRequest{
  id: string,
  technician_id: string,
}

interface RestartTicketResponse{
  ticket: Ticket
}

export class RestartTicketUseCase {
  constructor(private TicketsRepository: TicketsRepository){}




  async execute({id, technician_id}: RestartTicketRequest):Promise<RestartTicketResponse>{

    const checkTicket = await this.TicketsRepository.getTicket(id)

      if(checkTicket!.resolved){
        throw new TicketIsResolved()
      }
     
    
    const ticket = await this.TicketsRepository.restartTicket(id,technician_id)


    return {ticket}

  }
}