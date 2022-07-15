import { Module } from '@nestjs/common';
import { PetTypeService } from './pet_type.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PetType } from './entities/pet_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetType])],
  providers: [PetTypeService],
  exports: [PetTypeService],
})
export class PetTypeModule {}
