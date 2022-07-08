import { Module } from '@nestjs/common';
import { PetTypeService } from './pet_type.service';
import { PetTypeController } from './pet_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetType } from './entities/pet_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetType])],
  controllers: [PetTypeController],
  providers: [PetTypeService],
  exports: [PetTypeService],
})
export class PetTypeModule {}
