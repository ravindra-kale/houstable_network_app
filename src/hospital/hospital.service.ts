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
  async createHospital(
    createHospitalDto: CreateHospitalDto,
    @Res() res: Response,
  ) {
    try {
      return await this.hspitalRepo.save(createHospitalDto);
    } catch (error) {
      res.status(400).send(error.massage);
    }
  }
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
