import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: { name: string; status?: boolean; parentId?: number }) {
    const existingCategory = await this.categoryRepository.findByName(data.name);

    if (existingCategory) {
      throw new ConflictException('Category name already exists');
    }

    return this.categoryRepository.create({
      name: data.name,
      status: data.status ?? true,
      ...(data.parentId !== undefined ? { parentId: data.parentId } : {}),
    });
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  findByParent(parentId?: number | null) {
    return this.categoryRepository.findByParent(parentId);
  }

  createMainCategory(data: { name: string; status?: boolean }) {
    return this.create(data);
  }

  async createSubcategory(data: {
    name: string;
    status?: boolean;
    parentId: number;
  }) {
    if (data.parentId === null) {
      throw new BadRequestException('parentId is required for subcategory');
    }

    const parentCategory = await this.categoryRepository.findById(data.parentId);

    if (!parentCategory) {
      throw new NotFoundException('Parent category not found');
    }

    return this.create(data);
  }

  findOne(id: number) {
    return this.categoryRepository.findById(id);
  }

  update(
    id: number,
    data: { name?: string; status?: boolean; parentId?: number },
  ) {
    if (data.name) {
      return this.ensureUniqueNameAndUpdate(id, data);
    }

    return this.categoryRepository.update(id, data);
  }

  remove(id: number) {
    return this.categoryRepository.remove(id);
  }

  findMainCategories() {
    return this.categoryRepository.findMainCategories();
  }

  findSubCategories() {
    return this.categoryRepository.findSubCategories();
  }

  private async ensureUniqueNameAndUpdate(
    id: number,
    data: { name?: string; status?: boolean; parentId?: number },
  ) {
    const existingCategory = await this.categoryRepository.findByName(data.name!);

    if (existingCategory && existingCategory.id !== id) {
      throw new ConflictException('Category name already exists');
    }

    return this.categoryRepository.update(id, data);
  }
  findAllStructuredData() {
    return this.categoryRepository.findAllStructuredData();
  }
}
