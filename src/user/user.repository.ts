import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.client.user.create({ data });
  }

  findAll(): Promise<User[]> {
    return this.prisma.client.user.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findById(id: number): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: { email },
    });
  }

  update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.client.user.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<User> {
    return this.prisma.client.user.delete({
      where: { id },
    });
  }
}
