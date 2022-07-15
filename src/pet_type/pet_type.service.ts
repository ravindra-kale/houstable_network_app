import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { PetType } from './entities/pet_type.entity';
import { IPet_Type } from './interface/pet_type.interface';

@Injectable()
export class PetTypeService {
  constructor(
    @InjectRepository(PetType)
    private petTypeRepo: Repository<PetType>,
  ) {}
  async createPetType(pet_type: IPet_Type, @Res() res: Response) {
    try {
      return await this.petTypeRepo.save(pet_type);
    } catch (error) {
      res.send(error.massage);
    }
  }

  async updatePetType(id: string, petType: PetType) {
    try {
      await this.petTypeRepo.update(id, petType);
    } catch (error) {
      throw new error.massage();
    }
  }

  async removePetType(id: string) {
    try {
      await this.petTypeRepo.delete(id);
    } catch (error) {
      throw new error.massage();
    }
  }
}
