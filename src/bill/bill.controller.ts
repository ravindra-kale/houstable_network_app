import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { checkValidUUID, dateIsValid } from 'src/utils/validator';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  async createBill(@Body() createBillDto: CreateBillDto, @Res() res: Response) {
    try {
      const bill = new Bill();
      createBillDto.amount
        ? (bill.amount = createBillDto.amount)
        : res.status(400).send({ massage: 'plese enter valid amount' });
      createBillDto.date_paid && dateIsValid(createBillDto.date_paid)
        ? (bill.date_paid = createBillDto.date_paid)
        : res.status(400).send({
            massage: 'plese enter valid date_paid in format YYYY-MM-DD',
          });
      createBillDto.paid_status
        ? (bill.paid_status = createBillDto.paid_status)
        : res.status(400).send({
            massage: 'please provide valid paid status like paid or unpaid',
          });
      createBillDto.patient_id && checkValidUUID(createBillDto.patient_id)
        ? (bill.patient_id = createBillDto.patient_id)
        : res.status(400).send({ massage: 'please valid patient_id uuid' });

      createBillDto.appointment_id &&
      checkValidUUID(createBillDto.appointment_id)
        ? (bill.appointment_id = createBillDto.appointment_id)
        : res.status(400).send({ massage: 'please valid appointment_id uuid' });

      createBillDto.pet_id && checkValidUUID(createBillDto.pet_id)
        ? (bill.pet_id = createBillDto.pet_id)
        : res.status(400).send({ massage: 'please valid pet_id uuid' });
      const data = await this.billService.createBill(bill);
      res.json(data);
    } catch (error) {
      return error.massage;
    }
  }

  @Get()
  async findAllBill(): Promise<Bill[]> {
    try {
      return await this.billService.findAllBill();
    } catch (error) {
      return error.massage;
    }
  }

  @Get(':id')
  findOneBill(@Param('id') id: number): Promise<Bill[]> {
    try {
      return this.billService.findOneBill(id);
    } catch (error) {
      return error.massage;
    }
  }

  @Put(':id')
  async updateBill(
    @Param('id') id: string,
    @Body() updateBillDto: CreateBillDto,
  ) {
    try {
      return await this.billService.updateBill(+id, updateBillDto);
    } catch (error) {
      return error.massage;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.billService.removeBill(+id);
    } catch (error) {
      return error.massage;
    }
  }
}
