/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity/estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() estudiante: Estudiante): Promise<Estudiante> {
    return this.estudianteService.crearEstudiante(estudiante);
  }

  @Get(':id')
  async findEstudianteById(@Param('id', ParseIntPipe) id: number): Promise<Estudiante> {
    return this.estudianteService.findEstudianteById(id);
  }
}