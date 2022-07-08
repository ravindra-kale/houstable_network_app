import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { PetType } from './entities/pet_type.entity';
import { Pet_Type } from './interface/pet_type.interface';

@Injectable()
export class PetTypeService {
  constructor(
    @InjectRepository(PetType)
    private petTypeRepo: Repository<PetType>,
  ) {}
  async create(pet_type: Pet_Type, @Res() res: Response) {
    try {
      const petinfo: PetType = new PetType();
      pet_type.type
        ? (petinfo.type = pet_type.type)
        : res.status(400).send({ message: 'please provide valid pet type' });
      pet_type.favourites
        ? (petinfo.favourites = pet_type.favourites)
        : res
            .status(400)
            .send({ message: 'please provide valid favourites number' });
      return await this.petTypeRepo.save(petinfo);
    } catch (error) {
      res.send(error);
    }
  }
  // findAll() {
  //   return `This action returns all petType`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} petType`;
  // }
  // update(id: number, updatePetTypeDto: UpdatePetTypeDto) {
  //   return `This action updates a #${id} petType`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} petType`;
  // }
}
