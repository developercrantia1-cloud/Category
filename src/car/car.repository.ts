import { Injectable } from '@nestjs/common';
import { CarInfo, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

const carInclude = {
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  updatedBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} satisfies Prisma.CarInfoInclude;

@Injectable()
export class CarRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(
    data: Prisma.CarInfoCreateInput,
  ): Promise<Prisma.CarInfoGetPayload<{ include: typeof carInclude }>> {
    return this.prisma.client.carInfo.create({ data, include: carInclude });
  }
  

  update(
    id: number,
    data: Prisma.CarInfoUpdateInput,
  ): Promise<Prisma.CarInfoGetPayload<{ include: typeof carInclude }>> {
    return this.prisma.client.carInfo.update({
      where: { id },
      data,
      include: carInclude,
    });
  }
  findById(
    id: number,
  ): Promise<Prisma.CarInfoGetPayload<{ include: typeof carInclude }> | null> {
    return this.prisma.client.carInfo.findUnique({
      where: { id },
      include: carInclude,
    });
  }


  findAll(): Promise<Prisma.CarInfoGetPayload<{ include: typeof carInclude }>[]> {
    return this.prisma.client.carInfo.findMany({
      orderBy: { id: 'asc' },
      include: carInclude,
    });
  }
  remove(id: number): Promise<CarInfo> {
    return this.prisma.client.carInfo.delete({
      where: { id },
    });
  }
 

  
}
