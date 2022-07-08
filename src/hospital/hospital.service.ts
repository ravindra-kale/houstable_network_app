import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
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
  }

  findAll() {
    return `This action returns all hospital`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospital`;
  }

  update(id: number, updateHospitalDto: CreateHospitalDto) {
    return `This action updates a #${id} hospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}
