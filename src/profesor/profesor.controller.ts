/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity/profesor.entity';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async crearProfesor(@Body() profesor: Profesor): Promise<Profesor> {
    return this.profesorService.crearProfesor(profesor);
  }

  @Get(':id')
  async findProfesorById(@Param('id', ParseIntPipe) id: number): Promise<Profesor> {
    return this.profesorService.findProfesorById(id);
  }

  @Delete(':id')
  async eliminarProfesor(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.profesorService.eliminarProfesor(id);
  }

  @Delete('cedula/:cedula')
  async eliminarProfesorPorCedula(@Param('cedula', ParseIntPipe) cedula: number): Promise<void> {
    return this.profesorService.eliminarProfesorPorCedula(cedula);
  }
}
