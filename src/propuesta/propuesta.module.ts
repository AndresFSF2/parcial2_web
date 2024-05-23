/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaService } from './propuesta.service';
import { PropuestaController } from './propuesta.controller';
import { Propuesta } from './propuesta.entity/propuesta.entity';
import { Proyecto } from '../proyecto/proyecto.entity/proyecto.entity';
import { Profesor } from '../profesor/profesor.entity/profesor.entity';
import { Estudiante } from '../estudiante/estudiante.entity/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Propuesta, Proyecto, Profesor, Estudiante])],
  providers: [PropuestaService],
  controllers: [PropuestaController],
})
export class PropuestaModule {}