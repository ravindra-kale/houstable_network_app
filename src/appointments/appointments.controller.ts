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
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { checkValidUUID, dateIsValid } from 'src/utils/validator';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Res() res: Response,
  ) {
    try {
      const appt = new Appointment();
      createAppointmentDto.start_date
        ? (appt.start_date = createAppointmentDto.start_date)
        : res.status(400).send({ message: 'please provide valid start_date' });
      createAppointmentDto.end_date
        ? (appt.end_date = createAppointmentDto.end_date)
        : res.status(400).send({ message: 'please provide valid end_date' });
      createAppointmentDto.paid_status
        ? (appt.paid_status = createAppointmentDto.paid_status)
        : res.status(400).send({ message: 'please provide valid paid_status' });
      createAppointmentDto.description
        ? (appt.description = createAppointmentDto.description)
        : res.status(400).send({ message: 'please provide valid description' });
      createAppointmentDto.payment_mode
        ? (appt.payment_mode = createAppointmentDto.payment_mode)
        : res
            .status(400)
            .send({ message: 'please provide valid payment_mode' });
      createAppointmentDto.appointment_status
        ? (appt.appointment_status = createAppointmentDto.appointment_status)
        : res
            .status(400)
            .send({ message: 'please provide valid appointment_status' });
      createAppointmentDto.appointment_type
        ? (appt.appointment_type = createAppointmentDto.appointment_type)
        : res
            .status(400)
            .send({ message: 'please provide valid appointment_type' });
      createAppointmentDto.doctor_name
        ? (appt.doctor_name = createAppointmentDto.doctor_name)
        : res.status(400).send({ message: 'please provide valid doctor_name' });
      createAppointmentDto.hospital_name
        ? (appt.hospital_name = createAppointmentDto.hospital_name)
        : res
            .status(400)
            .send({ message: 'please provide valid hospital_name' });
      createAppointmentDto.appointment_duration
        ? (appt.appointment_duration =
            createAppointmentDto.appointment_duration)
        : res
            .status(400)
            .send({ message: 'please provide valid appointment_duration' });
      createAppointmentDto.patientId
        ? (appt.patientId = createAppointmentDto.patientId)
        : res.status(400).send({ message: 'please provide valid patientId' });
      res.send(await this.appointmentsService.createAppointment(appt));
    } catch (error) {
      res.send({ message: error.massage() });
    }
  }

  @Get()
  async findAllAppointments(): Promise<Appointment[]> {
    try {
      return await this.appointmentsService.findAllAppointment();
    } catch (error) {
      return error.massage();
    }
  }

  @Get('/id/:id')
  async findOneAppointment(
    @Param('id') id: string,
    res: Response,
  ): Promise<Appointment[]> {
    try {
      if (checkValidUUID(id)) {
        return await this.appointmentsService.findOneAppointment(id);
      } else {
        res.send({ message: 'please send valid uuid ' });
      }
    } catch (error) {
      return error.massage();
    }
  }

  @Put(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() updateAppointmentDto: CreateAppointmentDto,
  ) {
    try {
      if (checkValidUUID(id)) {
        return await this.appointmentsService.updateAppointment(
          id,
          updateAppointmentDto,
        );
      } else {
        return { message: 'please send valid uuid ' };
      }
    } catch (error) {
      return error.massage();
    }
  }

  @Delete(':id')
  async removeAppointment(@Param('id') id: string) {
    try {
      if (checkValidUUID(id)) {
        return await this.appointmentsService.removeAppointment(id);
      } else {
        return { message: 'please send valid uuid' };
      }
    } catch (error) {
      return error.massage;
    }
  }

  @Get('patient/:patient_id')
  async findAppointmentBypatientId(
    @Param('patient_id') patient_id: string,
    @Res() res: Response,
  ) {
    try {
      if (checkValidUUID(patient_id)) {
        const data = await this.appointmentsService.findAppointmentByPatient(
          patient_id,
        );
        res.json(data);
      } else {
        res.status(400).send({
          message: 'please provide valid uuid',
        });
      }
    } catch (error) {
      return error.massage;
    }
  }

  @Get('bydate')
  async getAppointmentByDate(@Body() body: any, @Res() res: Response) {
    try {
      if (dateIsValid(body.date)) {
        const data = await this.appointmentsService.getAppointmentByDate(body);
        if (data.length > 0) {
          res.json(data);
        } else {
          res.json({ massage: 'appointment not found for this date' });
        }
      } else {
        res
          .status(400)
          .send({ massage: 'please provide valid date in format YYYY-MM-DD' });
      }
    } catch (error) {
      res.send(error.massage);
    }
  }

  @Get('unpaid')
  async getUnpaidAppointment(@Res() res: Response) {
    try {
      const data = await this.appointmentsService.getUnpaidAppointment();
      if (data.length > 0) {
        res.json(data);
      } else {
        res.json({ massage: 'unpaid appointment not found ' });
      }
    } catch (error) {
      res.send(error);
    }
  }
}
