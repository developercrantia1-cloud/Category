import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

const uploadDir = join(process.cwd(), 'uploads', 'cars');
mkdirSync(uploadDir, { recursive: true });

const carImageUpload = FileInterceptor('image', {
  storage: diskStorage({
    destination: uploadDir,
    filename: (_req, file, callback) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      callback(new Error('Only image uploads are allowed'), false);
      return;
    }

    callback(null, true);
  },
});

const multipartCarBody = {
  schema: {
    type: 'object',
    properties: {
      carname: { type: 'string', example: 'F-150' },
      mileage: { type: 'number', example: 20000 },
      yearmodal: { type: 'number', example: 2010 },
      price: { type: 'number', example: 20000 },
      isActive: { type: 'boolean', example: true },
      createdByUserId: { type: 'number', example: 1 },
      updatedByUserId: { type: 'number', example: 1 },
      image: { type: 'string', format: 'binary' },
    },
  },
};

@ApiTags('carRegi')
@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) { }

    @Post()
    @UseInterceptors(carImageUpload)
    @ApiConsumes('multipart/form-data')
    @ApiBody(multipartCarBody)
    create(
      @Body() createCarDto: CreateCarDto,
      @UploadedFile() image?: Express.Multer.File,
    ) {
        return this.carService.MakeNewAd(createCarDto, image)
    }

    @Put(':id')
    @UseInterceptors(carImageUpload)
    @ApiConsumes('multipart/form-data')
    @ApiBody(multipartCarBody)
    update(
      @Param('id') id: string,
      @Body() body: UpdateCarDto,
      @UploadedFile() image?: Express.Multer.File,
    ) {
        return this.carService.OldAdUpdate(Number(id), body, image);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.carService.RemoveTheCar(Number(id))
    }

    @Get()
    findAll() {
        return this.carService.FindAllInGroup()
    }

    @Get(':id')
    findEach(@Param('id', ParseIntPipe) id: number) {
        return this.carService.findOneById(id)
    }

}
