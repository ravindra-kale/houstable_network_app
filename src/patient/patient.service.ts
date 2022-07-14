import { HttpCode, HttpException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { AddressService } from 'src/address/address.service';
import { HospitalService } from 'src/hospital/hospital.service';
import { PetTypeService } from 'src/pet_type/pet_type.service';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    private addressService: AddressService,
    private hosptalService: HospitalService,
    private petService: PetTypeService,
  ) {}

  async createPatient(
    createPatientDto: CreatePatientDto,
  ): Promise<CreatePatientDto> {
    try {
      return await this.patientRepo.save(createPatientDto);
    } catch (error) {
      return error.massage;
    }
  }

  async findAll(): Promise<Patient[]> {
    try {
      return await this.patientRepo.find();
    } catch (error) {
      return error.massage;
    }
  }

  async findOne(id: string): Promise<Patient[]> {
    try {
      return await this.patientRepo.find({ where: { id: id } });
    } catch (error) {
      return error.massage;
    }
  }

  async update(
    id: string,
    updatePatientDto: CreatePatientDto,
    @Res() res: Response,
  ) {
    try {
      if (updatePatientDto.address) {
        const addrsId = await this.patientRepo
          .createQueryBuilder()
          .select('address_id')
          .where('id = :id', { id: id })
          .execute();
        await this.addressService.updateAddress(
          addrsId[0].address_id,
          updatePatientDto.address,
        );
      }
      if (updatePatientDto.pet_type) {
        const petTypeId = await this.patientRepo
          .createQueryBuilder()
          .select('pet_id')
          .where('id = :id', { id: id })
          .execute();
        await this.petService.updatePetType(
          petTypeId[0].pet_id,
          updatePatientDto.pet_type,
        );
      }
      if (updatePatientDto.hospital) {
        const hospitalId = await this.patientRepo
          .createQueryBuilder()
          .select('hospital_id')
          .where('id = :id', { id: id })
          .execute();
        await this.hosptalService.updateHospital(
          hospitalId[0].hospital_id,
          updatePatientDto.hospital,
        );
      }
      const patient = new Patient();
      updatePatientDto.pet_name
        ? (patient.pet_name = updatePatientDto.pet_name)
        : '';
      updatePatientDto.owner_name
        ? (patient.owner_name = updatePatientDto.owner_name)
        : '';
      updatePatientDto.phone_number
        ? (patient.phone_number = updatePatientDto.phone_number)
        : '';
      updatePatientDto.favourites
        ? (patient.favourites = updatePatientDto.favourites)
        : '';
      const data = await this.patientRepo.update(id, patient);
      if (data.affected > 0) {
        return { message: 'Record updated successfully...!' };
      }
    } catch (error) {
      res.send(error.massage);
    }
  }

  async removePatientInfo(id: string) {
    try {
      const addrsId = await this.patientRepo
        .createQueryBuilder()
        .select('address_id')
        .where('id = :id', { id: id })
        .execute();

      const petTypeId = await this.patientRepo
        .createQueryBuilder()
        .select('pet_id')
        .where('id = :id', { id: id })
        .execute();

      const hospitalId = await this.patientRepo
        .createQueryBuilder()
        .select('hospital_id')
        .where('id = :id', { id: id })
        .execute();

      const data = await this.patientRepo.delete(id);
      await this.addressService.removeAddress(addrsId[0].address_id);
      await this.petService.removePetType(petTypeId[0].pet_id);
      await this.hosptalService.removeHospitalInfo(hospitalId[0].hospital_id);
      if (data.affected > 0) {
        return { message: 'Record deleted successfully' };
      }
    } catch (error) {
      return error.massage;
    }
  }

  async checkPhoneNumberInDB(phone_number: number) {
    const data = await this.patientRepo.find({
      where: { phone_number: phone_number },
    });
    if (data.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}
