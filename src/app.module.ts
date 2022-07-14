import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PatientModule } from './patient/patient.module';
import { AddressModule } from './address/address.module';
import { HospitalModule } from './hospital/hospital.module';
import { PetTypeModule } from './pet_type/pet_type.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { BillModule } from './bill/bill.module';
// import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNC'),
        logging: true,
      }),
      inject: [ConfigService],
    }),
    PatientModule,
    AddressModule,
    AppointmentsModule,
    BillModule,
    PetTypeModule,
    HospitalModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
