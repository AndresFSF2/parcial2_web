/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { Profesor } from './profesor.entity/profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity/propuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, Propuesta])],
  providers: [ProfesorService],
  controllers: [ProfesorController],
})
export class ProfesorModule {}