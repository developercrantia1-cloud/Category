import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('main')
  createMainCategory(@Body() body: CreateMainCategoryDto) {
    return this.categoryService.createMainCategory(body);
  }

  @Post('sub')
  createSubcategory(@Body() body: CreateSubcategoryDto) {
    return this.categoryService.createSubcategory(body);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  //Controller side validation
  //How does swagger know where the field is / required or not , and all

  @Get('filter')
  findByParent(@Query('parentId') parentId: string) {
    let parsedParentId: number | null;

    if (parentId === 'null') {
      parsedParentId = null;
    } else {
      parsedParentId = Number(parentId);
    }
    return this.categoryService.findByParent(parsedParentId);
  }

  // UPDATE
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.update(Number(id), body);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.categoryService.remove(Number(id));
  }
  @Get('structured')
  findAllStructuredData() {
    return this.categoryService.findAllStructuredData();
  }
}
