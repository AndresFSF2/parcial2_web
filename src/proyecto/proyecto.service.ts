/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../proyecto/proyecto.entity/proyecto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async crearProyecto(proyecto: Proyecto): Promise<Proyecto> {
    if (proyecto.fechaFin <= proyecto.fechaInicio) {
      throw new BusinessLogicException('La fecha de fin debe ser posterior a la fecha de inicio', BusinessError.NOT_FOUND);
    }
    return this.proyectoRepository.save(proyecto);
  }

}
