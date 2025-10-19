import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { env } from "process";

@Injectable()
export class Prisma
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["error", "info"],
      datasourceUrl: env.DATABASE_URL
    });
  }

  // it calls this method when prisma service starts
  onModuleInit(): Promise<void> {
    return this.$connect();
  }

  // it calls this method when prisma service finishes
  onModuleDestroy(): Promise<void> {
    return this.$disconnect();
  }
}
