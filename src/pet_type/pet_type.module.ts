import { Module } from '@nestjs/common';
import { PetTypeService } from './pet_type.service';
import { PetTypeController } from './pet_type.controller';

@Module({
  controllers: [PetTypeController],
  providers: [PetTypeService]
})
export class PetTypeModule {}
