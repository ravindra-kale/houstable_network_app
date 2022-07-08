import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  async createPatient(
    createPatientDto: CreatePatientDto,
  ): Promise<CreatePatientDto> {
    return await this.patientRepo.save(createPatientDto);
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientRepo.find();
  }

  async findOne(id: string): Promise<Patient[]> {
    return await this.patientRepo.find({ where: { id: id } });
  }

  update(id: number, updatePatientDto: CreatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: string) {
    return this.patientRepo.delete(id);
  }
}
