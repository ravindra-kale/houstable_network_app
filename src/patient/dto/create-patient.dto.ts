import { Address } from 'src/address/entities/address.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { PetType } from 'src/pet_type/entities/pet_type.entity';

export interface CreatePatientDto {
  pet_name: string;

  favourites: number;

  owner_name: string;

  phone_number: number;

  address: Address;

  pet_type: PetType;

  hospital: Hospital;
}
