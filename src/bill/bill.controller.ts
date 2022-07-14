import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { checkValidUUID, dateIsValid } from 'src/utils/validator';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './entities/bill.entity';

@Controller('bill')
@UseGuards(JwtAuthGuard)
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
        ? (bill.paid_status = createBillDto.paid_status.toLowerCase())
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

  @Get('/id/:id')
  async findOneBill(@Param('id') id: number): Promise<Bill[]> {
    try {
      return await this.billService.findOneBill(id);
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

  @Get('patient/:patient_id')
  async getBillByPatientId(@Param('patient_id') patient_id: string) {
    if (checkValidUUID(patient_id)) {
      try {
        return await this.billService.getBillByPatientId(patient_id);
      } catch (error) {
        return error.massage;
      }
    } else {
      return { massage: 'please provide valid patient id uuid' };
    }
  }

  @Get('/balanceByBillStatus')
  async balance_By_Status_And_Date(@Body() data: any, @Res() res: Response) {
    try {
      if (data.status) {
        if (
          data.status == undefined ||
          data.start_date == undefined ||
          data.end_date == undefined
        ) {
          !data.staus
            ? res.status(400).send({
                massage: 'please provid valid status like paid or unpaid',
              })
            : '';
          !data.start_date && dateIsValid(data.start_date)
            ? res.status(400).send({
                massage: 'please provid valid  start_date',
              })
            : '';
          !data.end_date && dateIsValid(data.end_date)
            ? res.status(400).send({ massage: 'please provide valid end_date' })
            : '';
        } else {
          if (data.status == 'paid' || data.status == 'unpaid') {
            res.send(await this.billService.balance_By_Status_And_Date(data));
          } else {
            res.status(400).send({
              massage: 'please provid the status must be paid or unpaid',
            });
          }
        }
      } else {
        res.status(400).send({
          massgae: `please provide valid obeject in body like
         {
          status : paid,
          start_date: YYYY-MM-DD,
          end_date: YYYY-MM-DD
         }
      `,
        });
      }
    } catch (error) {
      res.send(error.massage);
    }
  }

  @Get('balance')
  async total_Hospital_Balance() {
    try {
      return await this.billService.total_Hospital_Balance();
    } catch (error) {
      return error.massage;
    }
  }

  @Get('balanceEachPetType')
  async balance_By_Each_pet() {
    try {
      return await this.billService.balance_By_Each_pet();
    } catch (error) {
      return error.massage;
    }
  }

  @Get('popularPet')
  async getPopularPetType() {
    try {
      return this.billService.getPopularPetType();
    } catch (error) {
      return error.massage;
    }
  }
}
