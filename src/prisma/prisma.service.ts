import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService implements OnModuleInit {
  private prisma: PrismaClient;

  constructor() {
    const adapter = new PrismaMariaDb({
      host: '127.0.0.1',
      port: 3307,
      user: 'root',
      password: '',
      database: 'category_db',
    });

    this.prisma = new PrismaClient({
      adapter,
    });
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  get client() {
    return this.prisma;
  }
}
