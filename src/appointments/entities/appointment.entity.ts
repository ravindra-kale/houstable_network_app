import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Bill } from 'src/bill/entities/bill.entity';
import { Patient } from 'src/patient/entities/patient.entity';
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  start_date: Date;

  @IsNotEmpty()
  @Column()
  end_date: Date;

  @IsNotEmpty()
  @Column()
  paid_status: boolean;

  @IsNotEmpty()
  @Column()
  description: string;

  @IsNotEmpty()
  @Column()
  payment_mode: string;

  @IsNotEmpty()
  @Column()
  appointment_status: string;

  @IsNotEmpty()
  @Column()
  appointment_type: string;

  @IsNotEmpty()
  @Column()
  doctor_name: string;

  @IsNotEmpty()
  @Column()
  hospital_name: string;

  @IsNotEmpty()
  @Column()
  appointment_duration: number;

  @IsNotEmpty()
  @CreateDateColumn()
  created_at: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  updated_at: Date;

  @IsNotEmpty()
  @Column({ name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @OneToMany(() => Bill, (bill) => bill.appointment)
  bill: Bill;
}
