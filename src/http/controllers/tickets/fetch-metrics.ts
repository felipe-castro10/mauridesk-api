import { makeFetchMetricsUseCase } from "@/use-cases/factories/tickets/make-fetch-metrics-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function fetchMetrics(request: FastifyRequest, reply: FastifyReply){

  
  const fetchMetricsUseCase = await makeFetchMetricsUseCase()

  const {metrics} = await fetchMetricsUseCase.execute({user_id: request.user.sub, role: request.user.role})

  return reply.status(200).send({metrics})
}