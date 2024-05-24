/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Proyecto } from './proyecto.entity/proyecto.entity';
import { ProyectoService } from './proyecto.service';
import { faker } from '@faker-js/faker';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepository: Repository<Proyecto>;
  let proyectosList: Proyecto[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await proyectoRepository.delete({});
    proyectosList = [];
    for (let i = 0; i < 5; i++) {
      const proyecto: Proyecto = await proyectoRepository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        url: faker.internet.url(),
        propuesta: null,
      });
      proyectosList.push(proyecto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearProyecto debe crear un proyecto (caso positivo)', async () => {
    const proyecto: Proyecto = {
      id: faker.datatype.number(),
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      url: faker.internet.url(),
      propuesta: null,
      estudiante: null
    };
    const newProyecto: Proyecto = await service.crearProyecto(proyecto);
    expect(newProyecto).not.toBeNull();
    const storedProyecto: Proyecto = await proyectoRepository.findOne({ where: { id: newProyecto.id } });
    expect(storedProyecto).not.toBeNull();
    expect(storedProyecto.fechaInicio).toEqual(newProyecto.fechaInicio);
    expect(storedProyecto.fechaFin).toEqual(newProyecto.fechaFin);
  });

  it('crearProyecto debe lanzar una excepción si la fecha de fin es anterior a la fecha de inicio (caso negativo)', async () => {
    const proyecto: Proyecto = {
      id: faker.datatype.number(),
      fechaInicio: faker.date.future(),
      fechaFin: faker.date.past(),
      url: faker.internet.url(),
      propuesta: null,
      estudiante: null
    };
    await expect(service.crearProyecto(proyecto)).rejects.toHaveProperty(
      'message',
      'La fecha de fin debe ser posterior a la fecha de inicio'
    );
  });
});
