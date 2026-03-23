import { PrismaTicketsRepository } from "@/repositories/prisma/prisma-tickets-repository"
import { FetchMetricsUseCase } from "../fetch-metrics"



export function makeFetchMetricsUseCase() {
  const ticketsRepository = new PrismaTicketsRepository()
  const fetchMetricsUseCase = new FetchMetricsUseCase(ticketsRepository)

  return fetchMetricsUseCase
}
