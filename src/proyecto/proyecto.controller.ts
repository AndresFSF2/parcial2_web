import { Controller, Post, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.entity/proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async crearProyecto(@Body() proyecto: Proyecto): Promise<Proyecto> {
    return this.proyectoService.crearProyecto(proyecto);
  }
}
