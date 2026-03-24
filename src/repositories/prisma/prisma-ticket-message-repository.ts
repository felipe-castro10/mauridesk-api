import type { TicketMessage } from "@prisma/client";
import type { CreateMessageDTO } from "../interfaces/create-message-DTO";
import type { TicketMessageRepository } from "../ticket-message-repository";
import { prisma } from "@/lib/prisma";


export class PrismaTicketMessageRepository implements TicketMessageRepository{
  async create(data: CreateMessageDTO): Promise<TicketMessage> {
    const TicketMessage  = await prisma.ticketMessage.create({
      data:{
        ticket_id: data.ticket_id,
        user_id: data.user_id,
        text: data.text
      }
    })


    return TicketMessage
  }


  async listMessages(ticket_id: string): Promise<TicketMessage[] | null> {
    const TicketMessage = await prisma.ticketMessage.findMany({
      where:{
        ticket_id
      },
      include:{
        user:{
          select:{
            name: true,
            avatar: true,
          }
        }
      }
    })


    return TicketMessage
  }

}