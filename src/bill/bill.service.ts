import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepo: Repository<Bill>,
  ) {}

  async createBill(createBillDto: CreateBillDto): Promise<Bill> {
    try {
      return await this.billRepo.save(createBillDto);
    } catch (error) {
      return error.massage;
    }
  }

  async findAllBill(): Promise<Bill[]> {
    try {
      return await this.billRepo.find();
    } catch (error) {
      return error.massage;
    }
  }

  async findOneBill(id: number): Promise<Bill[]> {
    try {
      return await this.billRepo.find({ where: { id: id } });
    } catch (error) {
      return error.message;
    }
  }

  async updateBill(id: number, updateBillDto: CreateBillDto) {
    try {
      return await this.billRepo.update(id, updateBillDto);
    } catch (error) {
      return error.massage;
    }
  }

  async removeBill(id: number) {
    try {
      return await this, this.billRepo.delete(id);
    } catch (error) {
      return error.massage;
    }
  }
}
