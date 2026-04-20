import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';
import { CreateMainCategoryDto } from './create-main-category.dto';

export class CreateCategoryDto extends CreateMainCategoryDto {
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Parent category ID (null for main category)',
  })
  @IsInt()
  @IsOptional()
  parentId?: number;
}
