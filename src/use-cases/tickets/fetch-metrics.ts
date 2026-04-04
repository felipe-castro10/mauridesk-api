import type { MetricsDTO } from "@/repositories/interfaces/get-metrics-DTO";
import type { TicketsRepository } from "@/repositories/tickets-repository";


interface FetchMetricsRequest{
  user_id: string
  role: string
}

interface FetchMetricsResponse{
  metrics: MetricsDTO | null
}

export class FetchMetricsUseCase {
  constructor(private ticketRepository: TicketsRepository){}


  async execute({user_id, role}: FetchMetricsRequest): Promise<FetchMetricsResponse> {

    const creator_id = role === 'CLIENT' ? user_id : undefined

   
    

    const metrics = await this.ticketRepository.fetchMetrics(creator_id)
    

    return {metrics}
  }
}