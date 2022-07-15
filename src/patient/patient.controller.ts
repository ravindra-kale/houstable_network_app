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
  BadRequestException,
  HttpException,
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
import { Address } from 'src/address/entities/address.entity';
import { PetType } from 'src/pet_type/entities/pet_type.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';

@Controller('patient')
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly addresService: AddressService,
    private readonly petTypeService: PetTypeService,
    private readonly hospitalService: HospitalService,
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

        //address validation
        const addrs = new Address();
        const pet_type = new PetType();
        const hospital = new Hospital();

        createPatientDto.address.address1
          ? (addrs.address1 = createPatientDto.address.address1)
          : res
              .status(400)
              .send({ message: 'please send address1 in address object' });
        createPatientDto.address.address2
          ? (addrs.address2 = createPatientDto.address.address2)
          : res
              .status(400)
              .send({ message: 'please send address2 in address object' });
        createPatientDto.address.city
          ? (addrs.city = createPatientDto.address.city)
          : res
              .status(400)
              .send({ message: 'please send city in address object' });
        createPatientDto.address.country
          ? (addrs.country = createPatientDto.address.country)
          : res
              .status(400)
              .send({ message: 'please send counrty in address object' });
        createPatientDto.address.pincode
          ? (addrs.pincode = createPatientDto.address.pincode)
          : res
              .status(400)
              .send({ message: 'please send pincode in address object' });
        createPatientDto.address.state
          ? (addrs.state = createPatientDto.address.state)
          : res
              .status(400)
              .send({ message: 'please send state in address object' });

        //validating pet type
        createPatientDto.pet_type.type
          ? (pet_type.type = createPatientDto.pet_type.type)
          : res
              .status(400)
              .send({ message: 'please provide valid pet type in object' });
        createPatientDto.pet_type.favourites
          ? (pet_type.favourites = createPatientDto.pet_type.favourites)
          : res.status(400).send({
              message: 'please provide valid favourites number in object',
            });
        // validating hospital object
        createPatientDto.hospital.name
          ? (hospital.name = createPatientDto.hospital.name)
          : res
              .status(400)
              .send({ message: 'please provide haospital name in object' });
        createPatientDto.hospital.code
          ? (hospital.code = createPatientDto.hospital.code)
          : res
              .status(400)
              .send({ message: 'please provide haospital code in object' });

        if (res.statusCode !== 400) {
          patient.address = await this.addresService.createAddress(
            createPatientDto.address,
            res,
          );
        }
        if (res.statusCode !== 400) {
          patient.pet_type = await this.petTypeService.createPetType(
            createPatientDto.pet_type,
            res,
          );
        }
        if (res.statusCode !== 400) {
          patient.hospital = await this.hospitalService.createHospital(
            hospital,
            res,
          );
        }
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

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAllPatinet() {
    try {
      return await this.patientService.findAll();
    } catch (error) {
      throw new HttpException(`error : ${error}`, 400);
    }
  }

  @Get(':id')
  async findOnePatient(@Param('id') id: string) {
    const data = await this.patientService.findOne(id);
    if (data.length > 0) {
      return data;
    } else {
      return { massage: 'patient not found...!' };
    }
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
