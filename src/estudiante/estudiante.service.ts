/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from '../estudiante/estudiante.entity/estudiante.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async crearEstudiante(estudiante: Estudiante): Promise<Estudiante> {
    if (estudiante.codigo.length !== 10) {
      throw new BusinessLogicException('El código de estudiante debe tener 10 caracteres', BusinessError.NOT_FOUND);
    }
    return this.estudianteRepository.save(estudiante);
  }

  async findEstudianteById(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!estudiante) {
      throw new BusinessLogicException(`Estudiante con id ${id} no encontrado`, BusinessError.NOT_FOUND);
    }
    return estudiante;
  }
}
