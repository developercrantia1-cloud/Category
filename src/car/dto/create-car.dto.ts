import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'F-150' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  carname!: string;

  @ApiProperty({ example: '20000' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100000)
  mileage!: number;

  @ApiProperty({ example: '2010' })
  @Type(() => Number)
  @IsInt()
  @Min(1990)
  @Max(2026)
  yearmodal!: number;

  @ApiProperty({ example: '20000' })
  @Type(() => Number)
  @IsInt()
  @Min(10000)
  @Max(10000000)
  price!: number;

  @ApiPropertyOptional({ example: true, default: true })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  createdByUserId?: number;

  @ApiPropertyOptional({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  updatedByUserId?: number;
}
