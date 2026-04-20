import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class CreateSubcategoryDto extends CreateCategoryDto {
  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
  })
  @IsInt()
  declare parentId: number;
}
