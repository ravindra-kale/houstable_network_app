import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Patient } from 'src/patient/entities/patient.entity';
import { endWith } from 'rxjs';
@Entity()
export class Hospital {
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  code: string;

  @OneToMany(() => Patient, (patient) => patient.hospital)
  patient: Patient;
}
