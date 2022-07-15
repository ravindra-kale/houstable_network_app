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
  async createAddress(createAddressDto: address, @Res() res: Response) {
    try {
      return await this.addressRepo.save(createAddressDto);
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
