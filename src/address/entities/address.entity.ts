import { IsNotEmpty } from 'class-validator';
import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  address1: string;

  @IsNotEmpty()
  @Column()
  address2: string;

  @IsNotEmpty()
  @Column()
  pincode: number;

  @IsNotEmpty()
  @Column()
  city: string;

  @IsNotEmpty()
  @Column()
  state: string;

  @IsNotEmpty()
  @Column()
  country: string;

  @IsNotEmpty()
  @CreateDateColumn()
  created_at: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Patient, (patient) => patient.address)
  patient: Patient;
}
