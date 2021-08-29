import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { Metrics } from "../plugins/metrics";

export interface Context {
  prisma: PrismaClient;
  request: FastifyRequest;
  reply: FastifyReply;
  metrics: Metrics;
}
