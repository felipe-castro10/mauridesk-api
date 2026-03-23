import type { TicketsRepository } from "@/repositories/tickets-repository";
import type { Ticket } from "@prisma/client";
import { TicketIsResolved } from "./errors/ticket-is-resolved";
import { TicketNotExistsError } from "./errors/tickets-not-exists-error";



interface ClosedTicketRequest{
  id: string,
  technician_id: string,
  resolved?: boolean 
}




export class ClosedTicketUseCase{

  constructor(private ticketsRepository: TicketsRepository){}

  async execute({id,technician_id,resolved}: ClosedTicketRequest):Promise<Ticket>{

      const checkTicket = await this.ticketsRepository.getTicket(id)

    
      if(checkTicket!.resolved){
        throw new TicketIsResolved()
      }
     

      const ticket = await this.ticketsRepository.closeTicket(id, technician_id,resolved)

      return ticket
  }
}