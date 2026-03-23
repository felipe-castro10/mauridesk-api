import { PrismaTicketsRepository } from "@/repositories/prisma/prisma-tickets-repository";
import { RestartTicketUseCase } from "../restart-ticket-use-case";


export function makeRestartTicketUseCase(){
    const ticketRepository = new PrismaTicketsRepository()
    const restartTicketUseCase = new RestartTicketUseCase(ticketRepository)


    return restartTicketUseCase
}