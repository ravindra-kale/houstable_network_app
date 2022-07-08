import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Bill } from 'src/bill/entities/bill.entity';
import { Patient } from 'src/patient/entities/patient.entity';
@Entity()
export class PetType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  type: string;

  @IsNotEmpty()
  @Column()
  favourites: number;

  @IsNotEmpty()
  @CreateDateColumn()
  created_at: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Patient, (patient) => patient.pet_type)
  patient: Patient;

  @OneToMany(() => Bill, (bill) => bill.pet_type)
  bill: Bill;
}
