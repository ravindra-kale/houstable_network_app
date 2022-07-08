import { HostParam, Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';

import { Hospital } from './entities/hospital.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  providers: [HospitalService],
  exports: [HospitalService],
})
export class HospitalModule {}
