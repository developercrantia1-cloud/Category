import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.client.category.create({ data });
  }

  findAll(): Promise<Category[]> {
    return this.prisma.client.category.findMany();
  }

  findByParent(parentId?: number | null): Promise<Category[]> {
    return this.prisma.client.category.findMany({
      where: {
        parentId: parentId === null ? null : parentId,
      },
    });
  }

  findById(id: number): Promise<Category | null> {
    return this.prisma.client.category.findUnique({
      where: { id },
    });
  }

  findByName(name: string): Promise<Category | null> {
    return this.prisma.client.category.findUnique({
      where: { name },
    });
  }

  update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.client.category.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Category> {
    return this.prisma.client.category.delete({
      where: { id },
    });
  }

  findMainCategories() {
    return this.prisma.client.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: true,
      },
    });
  }

  findSubCategories() {
    return this.prisma.client.category.findMany({
      where: {
        parentId: {
          not: null,
        },
      },
      include: {
        parent: true,
      },
    });
  }

  findAllStructuredData() {
    return this.prisma.client.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: {
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
