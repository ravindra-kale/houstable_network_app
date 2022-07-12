import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Patient } from 'src/patient/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PetType } from 'src/pet_type/entities/pet_type.entity';
@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  amount: string;

  @IsNotEmpty()
  @Column({ name: 'appointment_id' })
  appointment_id: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.bill)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @IsNotEmpty()
  @Column({ name: 'patient_id' })
  patient_id: string;

  @ManyToOne((name) => Patient, (patient) => patient.bill)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @IsNotEmpty()
  @Column({ name: 'pet_id' })
  pet_id: string;

  @ManyToOne(() => PetType, (pt_type) => pt_type.bill)
  @JoinColumn({ name: 'pet_id' })
  pet_type: PetType;

  @IsNotEmpty()
  @Column()
  paid_status: string;

  @IsNotEmpty()
  @Column()
  date_paid: Date;

  @IsNotEmpty()
  @CreateDateColumn()
  created_at: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  updated_at: Date;
}
