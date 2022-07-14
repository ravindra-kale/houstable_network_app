import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { Response } from 'express';
import { AddressService } from 'src/address/address.service';
import { PetTypeService } from 'src/pet_type/pet_type.service';
import { HospitalService } from 'src/hospital/hospital.service';
import { throwError } from 'rxjs';
import { phone_validation } from 'src/utils/validator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('patient')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private addresService: AddressService,
    private petTypeService: PetTypeService,
    private hospitalService: HospitalService,
  ) {}

  @Post()
  async createPatient(
    @Body() createPatientDto: CreatePatientDto,
    @Res() res: Response,
  ) {
    try {
      if (
        await this.patientService.checkPhoneNumberInDB(
          Number(createPatientDto.phone_number),
        )
      ) {
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
        createPatientDto.phone_number &&
        phone_validation(createPatientDto.phone_number.toString())
          ? (patient.phone_number = Number(createPatientDto.phone_number))
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
        console.log('hello world');

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
        res
          .status(400)
          .send('Phone number is already available :  ' + throwError);
      }
    } catch (error) {
      res.json(error.massage);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllPatinet(): Promise<Patient[]> {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOnePatient(@Param('id') id: string): Promise<Patient[]> {
    return await this.patientService.findOne(id);
  }

  @Put(':id')
  async updatePatientInfo(
    @Param('id') id: string,
    @Body() updatePatient: CreatePatientDto,
    @Res() res: Response,
  ) {
    const data = await this.patientService.update(id, updatePatient, res);
    res.send(data);
  }

  @Delete(':id')
  removePatientInfo(@Param('id') id: string) {
    return this.patientService.removePatientInfo(id);
  }
}
