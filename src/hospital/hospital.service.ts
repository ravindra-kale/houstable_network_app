import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e, { Response } from 'express';
import { throwError } from 'rxjs';

import { Repository } from 'typeorm';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hspitalRepo: Repository<Hospital>,
  ) {}
  async create(createHospitalDto: CreateHospitalDto, @Res() res: Response) {
    try {
      const hospital = new Hospital();
      createHospitalDto.name
        ? (hospital.name = createHospitalDto.name)
        : res
            .status(400)
            .send({ message: 'please provide haospital name in object' });
      createHospitalDto.code
        ? (hospital.code = createHospitalDto.code)
        : res
            .status(400)
            .send({ message: 'please provide haospital code in object' });
      return await this.hspitalRepo.save(hospital);
    } catch (error) {
      res.status(400).send(error.massage);
    }
  }

  // findAll() {
  //   return `This action returns all hospital`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} hospital`;
  // }

  async updateHospital(id: string, updateHospitalDto: CreateHospitalDto) {
    try {
      await this.hspitalRepo.update(id, updateHospitalDto);
    } catch (error) {
      throw new error.massage();
    }
  }

  async removeHospitalInfo(id: string) {
    try {
      await this.hspitalRepo.delete(id);
    } catch (error) {
      throw new error.massage();
    }
  }
}
