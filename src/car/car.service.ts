import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { CarRepository } from './car.repository';
import { UpdateCarDto } from './dto/update-car.dto';
import { Express } from 'express';

@Injectable()
export class CarService {
    constructor(private readonly carRepository: CarRepository) { }
    async MakeNewAd(createCarDto: CreateCarDto, image?: Express.Multer.File) {
        return this.carRepository.create({
            carname: createCarDto.carname,
            yearmodal: createCarDto.yearmodal,
            price: createCarDto.price,
            mileage: createCarDto.mileage,
            isActive: createCarDto.isActive,
            imagePath: image ? `/uploads/cars/${image.filename}` : undefined,
            createdBy: createCarDto.createdByUserId
                ? { connect: { id: createCarDto.createdByUserId } }
                : undefined,
            updatedBy: createCarDto.updatedByUserId
                ? { connect: { id: createCarDto.updatedByUserId } }
                : undefined,
        })
    }

    async OldAdUpdate(
        id: number,
        updateCarDto: UpdateCarDto,
        image?: Express.Multer.File,
    ) {
        await this.findOneById(id);

        return this.carRepository.update(id, {
            carname: updateCarDto.carname,
            yearmodal: updateCarDto.yearmodal,
            price: updateCarDto.price,
            mileage: updateCarDto.mileage,
            isActive: updateCarDto.isActive,
            imagePath: image ? `/uploads/cars/${image.filename}` : undefined,
            createdBy: updateCarDto.createdByUserId
                ? { connect: { id: updateCarDto.createdByUserId } }
                : updateCarDto.createdByUserId === null
                  ? { disconnect: true }
                  : undefined,
            updatedBy: updateCarDto.updatedByUserId
                ? { connect: { id: updateCarDto.updatedByUserId } }
                : updateCarDto.updatedByUserId === null
                  ? { disconnect: true }
                  : undefined,
        })
    }

    
    async findOneById(id: number) {
        const car = await this.carRepository.findById(id)
        if (!car) {
            throw new NotFoundException(`Car with id ${id} not found`);
        }

        return car;
         
    }
    async FindAllInGroup(){
        return this.carRepository.findAll();
    }


    async RemoveTheCar(id: number) {
        await this.findOneById(id)
        await this.carRepository.remove(id)
    }



}
