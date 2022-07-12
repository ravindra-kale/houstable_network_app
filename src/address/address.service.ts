import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { address } from './interfaces/address.interface';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
  ) {}
  async create(createAddressDto: address, @Res() res: Response) {
    try {
      const addrs = new Address();
      createAddressDto.address1
        ? (addrs.address1 = createAddressDto.address1)
        : res
            .status(400)
            .send({ message: 'please send address1 in address object' });
      createAddressDto.address2
        ? (addrs.address2 = createAddressDto.address2)
        : res
            .status(400)
            .send({ message: 'please send address2 in address object' });
      createAddressDto.city
        ? (addrs.city = createAddressDto.city)
        : res
            .status(400)
            .send({ message: 'please send city in address object' });
      createAddressDto.country
        ? (addrs.country = createAddressDto.country)
        : res
            .status(400)
            .send({ message: 'please send counrty in address object' });
      createAddressDto.pincode
        ? (addrs.pincode = createAddressDto.pincode)
        : res
            .status(400)
            .send({ message: 'please send pincode in address object' });
      createAddressDto.state
        ? (addrs.state = createAddressDto.state)
        : res
            .status(400)
            .send({ message: 'please send state in address object' });
      return await this.addressRepo.save(addrs);
    } catch (error) {
      res.send(error.massage);
    }
  }
  async updateAddress(id, address: Address) {
    try {
      this.addressRepo.update(id, address);
    } catch (error) {
      throw error.massage();
    }
  }
  async removeAddress(id: string) {
    try {
      await this.addressRepo.delete(id);
    } catch (error) {
      throw new error.massage();
    }
  }
  // findAll() {
  //   return `This action returns all address`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} address`;
  // }
  // update(id: number, updateAddressDto: UpdateAddressDto) {
  //   return `This action updates a #${id} address`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} address`;
  // }
}
