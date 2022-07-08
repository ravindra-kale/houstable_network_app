import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { AddressModule } from 'src/address/address.module';
import { PetTypeModule } from 'src/pet_type/pet_type.module';
import { HospitalModule } from 'src/hospital/hospital.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    AddressModule,
    PetTypeModule,
    HospitalModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
