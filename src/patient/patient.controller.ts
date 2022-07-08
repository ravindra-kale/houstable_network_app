import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { Response } from 'express';
import { AddressService } from 'src/address/address.service';
import { PetTypeService } from 'src/pet_type/pet_type.service';
import { HospitalService } from 'src/hospital/hospital.service';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private addresService: AddressService,
    private petTypeService: PetTypeService,
    private hospitalService: HospitalService,
  ) {}

  @Post()
  async create(
    @Body() createPatientDto: CreatePatientDto,
    @Res() res: Response,
  ) {
    try {
      if (createPatientDto) {
        const patient: Patient = new Patient();
        createPatientDto.owner_name
          ? (patient.owner_name = createPatientDto.owner_name)
          : res.status(400).send({ message: 'plaese provide the owner name' });
        createPatientDto.pet_name
          ? (patient.pet_name = createPatientDto.pet_name)
          : res.status(400).send({ message: 'plaese provide the pet name' });
        createPatientDto.favourites
          ? (patient.favourites = createPatientDto.favourites)
          : res.status(400).send({ message: 'please send favourites number ' });
        createPatientDto.phone_number
          ? (patient.phone_number = createPatientDto.phone_number)
          : res
              .status(400)
              .send({ massage: 'please send valid mobile number' });
        createPatientDto.address
          ? (patient.address = await this.addresService.create(
              createPatientDto.address,
              res,
            ))
          : res
              .status(400)
              .send({ message: 'please provide the valid address' });

        createPatientDto.pet_type
          ? (patient.pet_type = await this.petTypeService.create(
              createPatientDto.pet_type,
              res,
            ))
          : res
              .status(400)
              .send({ message: 'please provide the valid pet type object' });

        createPatientDto.hospital
          ? (patient.hospital = await this.hospitalService.create(
              createPatientDto.hospital,
              res,
            ))
          : res
              .status(400)
              .send({ message: 'please send valid hospital object' });
        const data = await this.patientService.createPatient(patient);
        res.json(data);
      } else {
        res.status(400).send('please send valid patient data');
      }
    } catch (error) {
      res.send(error);
    }
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient[]> {
    return await this.patientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: CreatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
