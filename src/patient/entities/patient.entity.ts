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
import { Address } from 'src/address/entities/address.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Bill } from 'src/bill/entities/bill.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { PetType } from 'src/pet_type/entities/pet_type.entity';

@Entity()
export class Patient {
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  pet_name: string;

  @IsNotEmpty()
  @Column({ name: 'pet_id' })
  petTypeId: string;

  @ManyToOne(() => PetType, (Pet_type) => Pet_type.patient, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pet_id' })
  pet_type: PetType;

  @IsNotEmpty()
  @Column()
  favourites: number;

  @IsNotEmpty()
  @Column()
  owner_name: string;

  @IsNotEmpty()
  @Column({ name: 'address_id' })
  addressId: string;

  @ManyToOne(() => Address, (address) => address.patient, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @IsNotEmpty()
  @Column({ unique: true, type: 'int8' })
  phone_number: number;

  @IsNotEmpty()
  @Column({ name: 'hospital_id' })
  hospitalId: Hospital;
  @ManyToOne(() => Hospital, (hospital) => hospital.patient, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hospital_id' })
  hospital: Hospital;

  @IsNotEmpty()
  @CreateDateColumn()
  created_at: Date;

  @IsNotEmpty()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Bill, (bill) => bill.patient)
  bill: Bill;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment;
}
