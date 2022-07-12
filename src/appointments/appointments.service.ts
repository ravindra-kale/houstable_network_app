import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private apptRepo: Repository<Appointment>,
  ) {}

  //create new appointment
  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<CreateAppointmentDto> {
    try {
      return await this.apptRepo.save(createAppointmentDto);
    } catch (error) {
      return error.massage;
    }
  }
  //get all appointments
  async findAllAppointment() {
    try {
      return await this.apptRepo.find();
    } catch (error) {
      return error.massage;
    }
  }

  //find single appointments
  async findOneAppointment(id: string): Promise<Appointment[]> {
    try {
      return await this.apptRepo.find({ where: { id: id } });
    } catch (error) {
      return error.massage;
    }
  }
  //update appointment
  async updateAppointment(
    id: string,
    updateAppointmentDto: CreateAppointmentDto,
  ) {
    try {
      const data = await this.apptRepo.update(id, updateAppointmentDto);
      if (data.affected > 0) {
        return { message: 'record updated successfully...!' };
      }
    } catch (error) {
      return error.massage;
    }
  }

  //remove appointment
  async removeAppointment(id: string) {
    try {
      const data = await this.apptRepo.delete(id);
      if (data.affected > 0) {
        return { message: 'record deleted successfully...!' };
      } else {
        return { message: 'record not found..!' };
      }
    } catch (error) {
      return error.massage;
    }
  }
  // find appointment by patient id
  async findAppointmentByPatient(patient_id: string) {
    try {
      return await this.apptRepo.find({ where: { patientId: patient_id } });
    } catch (error) {
      return { message: error.massage };
    }
  }

  async getAppointmentByDate(data: any) {
    const appt = await this.apptRepo
      .createQueryBuilder()
      .select('*')
      .where(
        `TO_DATE(to_char(start_date,'YYYY-MM-DD'),'YYYY-MM-DD') = to_timestamp('${data.date}', 'YYYY-MM-DD')`,
      )
      .execute();
    return appt;
  }
  async getUnpaidAppointment() {
    try {
      return await this.apptRepo.find({ where: { paid_status: false } });
    } catch (error) {
      return error.massage;
    }
  }
}
