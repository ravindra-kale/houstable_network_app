import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
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

  async getBillByPatientId(patient_id): Promise<Bill[]> {
    try {
      return await this.billRepo.find({
        where: { patient_id: patient_id } && {
          paid_status: 'unpaid'.toLowerCase(),
        },
      });
    } catch (error) {
      return error.massage;
    }
  }
  async balance_By_Status_And_Date(data: any): Promise<string> {
    try {
      return await this.billRepo.query(`SELECT sum(b.amount::bigint) 
                AS balance 
                FROM bill b 
                WHERE b.paid_status = '${data.status}' 
                AND b.date_paid BETWEEN '${data.start_date}' 
                                  AND '${data.end_date}'`);
    } catch (error) {
      return error.massage;
    }
  }
  async total_Hospital_Balance() {
    try {
      const data = await this.billRepo
        .createQueryBuilder()
        .select('Sum(amount::bigint)', 'balance')
        .execute();
      return { massage: `Hospital Total Balance is : ${data[0].balance}$` };
    } catch (error) {
      return error.massage;
    }
  }

  async balance_By_Each_pet() {
    try {
      return await this.billRepo.query(
        `SELECT pt."type" ,sum(bl.amount::bigint)AS balance
         FROM bill bl 
         JOIN pet_type pt 
         ON pt.id = bl.pet_id  
         GROUP BY pt."type"`,
      );
    } catch (error) {
      return error.massage;
    }
  }

  async getPopularPetType() {
    try {
      const data = await this.billRepo
        .query(`select pt."type", COUNT(pt.type) AS MOST_FREQUENT
                from bill bl 
                JOIN pet_type pt ON pt.id = bl.pet_id
                GROUP BY pt."type"
                ORDER BY COUNT(pt."type") DESC`);
      return data[0];
    } catch (error) {
      return error.massage;
    }
  }
}

//`SELECT sum(b.amount::bigint) AS balance FROM bill b
//SELECT pt."type" ,sum(bl.amount::bigint)AS balance FROM bill bl JOIN pet_type pt ON pt.id = bl.pet_id  GROUP BY pt."type"
