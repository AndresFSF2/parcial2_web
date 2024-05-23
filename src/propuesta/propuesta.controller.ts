/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from '../propuesta/propuesta.entity/propuesta.entity';

@Controller('propuestas')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Post()
  async crearPropuesta(@Body() propuesta: Propuesta): Promise<Propuesta> {
    return this.propuestaService.crearPropuesta(propuesta);
  }

  @Get(':id')
  async findPropuestaById(@Param('id', ParseIntPipe) id: number): Promise<Propuesta> {
    return this.propuestaService.findPropuestaById(id);
  }

  @Get()
  async findAllPropuesta(): Promise<Propuesta[]> {
    return this.propuestaService.findAllPropuesta();
  }

  @Delete(':id')
  async deletePropuesta(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.propuestaService.deletePropuesta(id);
  }
}