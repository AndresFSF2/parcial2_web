/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './profesor.entity/profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity/propuesta.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ProfesorService {
  private readonly gruposInvestigacion = ['TICSW', 'IMAGINE', 'COMIT'];

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Propuesta)
    private readonly propuestaRepository: Repository<Propuesta>,
  ) {}

  async crearProfesor(profesor: Profesor): Promise<Profesor> {
    if (!this.gruposInvestigacion.includes(profesor.grupoInvestigacion)) {
      throw new BusinessLogicException(
        `El grupo de investigación debe ser uno de los siguientes: ${this.gruposInvestigacion.join(', ')}`, BusinessError.NOT_FOUND
      );
    }
    return await this.profesorRepository.save(profesor);
  }

  async findProfesorById(id: number): Promise<Profesor> {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor) {
      throw new BusinessLogicException(`Profesor con id ${id} no encontrado`, BusinessError.NOT_FOUND);
    }
    return profesor;
  }

  async eliminarProfesor(id: number): Promise<void> {
    const profesor = await this.findProfesorById(id);
    const propuestas = await this.propuestaRepository.find({ where: { profesor: { id: profesor.id } }, relations: ['proyecto'] });

    for (const propuesta of propuestas) {
      if (propuesta.proyecto) {
        throw new BusinessLogicException('El profesor no se puede eliminar porque tiene una propuesta con un proyecto asociado', BusinessError.NOT_FOUND);
      }
    }

    await this.profesorRepository.remove(profesor);
  }

  async eliminarProfesorPorCedula(cedula: number): Promise<void> {
    const profesor = await this.profesorRepository.findOne({ where: { cedula } });
    if (!profesor) {
      throw new BusinessLogicException(`Profesor con cédula ${cedula} no encontrado`, BusinessError.NOT_FOUND);
    }

    const propuestas = await this.propuestaRepository.find({ where: { profesor: { id: profesor.id } }, relations: ['proyecto'] });

    for (const propuesta of propuestas) {
      if (propuesta.proyecto) {
        throw new BusinessLogicException('El profesor no se puede eliminar porque tiene una propuesta con un proyecto asociado',  BusinessError.NOT_FOUND);
      }
    }

    await this.profesorRepository.remove(profesor);
  }
}
