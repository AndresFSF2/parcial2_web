/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propuesta } from '../propuesta/propuesta.entity/propuesta.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(Propuesta)
    private readonly propuestaRepository: Repository<Propuesta>,
  ) {}

  async crearPropuesta(propuesta: Propuesta): Promise<Propuesta> {
    if (!propuesta.titulo || propuesta.titulo.trim() === '') {
      throw new BusinessLogicException('El título no puede estar vacío', BusinessError.NOT_FOUND);
    }
    return this.propuestaRepository.save(propuesta);
  }

  async findPropuestaById(id: number): Promise<Propuesta> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id }, relations: ['proyecto'] });
    if (!propuesta) {
      throw new BusinessLogicException(`Propuesta con id ${id} no encontrada`, BusinessError.NOT_FOUND);
    }
    return propuesta;
  }

  async findAllPropuesta(): Promise<Propuesta[]> {
    return this.propuestaRepository.find({ relations: ['proyecto'] });
  }

  async deletePropuesta(id: number): Promise<void> {
    const propuesta = await this.findPropuestaById(id);
    if (propuesta.proyecto) {
      throw new BusinessLogicException('La propuesta no se puede eliminar porque tiene un proyecto asociado',BusinessError.NOT_FOUND);
    }
    await this.propuestaRepository.remove(propuesta);
  }
}
