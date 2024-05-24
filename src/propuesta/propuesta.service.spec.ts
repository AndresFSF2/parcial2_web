/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Propuesta } from './propuesta.entity/propuesta.entity';
import { PropuestaService } from './propuesta.service';
import { faker } from '@faker-js/faker';
import { Proyecto } from '../proyecto/proyecto.entity/proyecto.entity';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let propuestaRepository: Repository<Propuesta>;
  let proyectoRepository: Repository<Proyecto>;
  let propuestasList: Propuesta[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    propuestaRepository = module.get<Repository<Propuesta>>(getRepositoryToken(Propuesta));
    proyectoRepository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await propuestaRepository.delete({});
    await proyectoRepository.delete({});
    propuestasList = [];
    for (let i = 0; i < 5; i++) {
      const propuesta: Propuesta = await propuestaRepository.save({
        titulo: faker.lorem.sentence(),
        descripcion: faker.lorem.paragraph(),
        palabraClave: faker.lorem.word(),
        profesor: null,
        proyecto: null,
        estudiantes: [],
      });
      propuestasList.push(propuesta);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearPropuesta debe crear una propuesta (caso positivo)', async () => {
    const propuesta: Propuesta = {
      id: faker.datatype.number(),
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
      profesor: null,
      proyecto: null,
    };
    const newPropuesta: Propuesta = await service.crearPropuesta(propuesta);
    expect(newPropuesta).not.toBeNull();
    const storedPropuesta: Propuesta = await propuestaRepository.findOne({ where: { id: newPropuesta.id } });
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(newPropuesta.titulo);
    expect(storedPropuesta.descripcion).toEqual(newPropuesta.descripcion);
  });

  it('crearPropuesta debe lanzar una excepción si el título está vacío (caso negativo)', async () => {
    const propuesta: Propuesta = {
      id: faker.datatype.number(),
      titulo: '',
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
      profesor: null,
      proyecto: null,
    };
    await expect(service.crearPropuesta(propuesta)).rejects.toHaveProperty(
      'message',
      'El título no puede estar vacío'
    );
  });

  it('findPropuestaById debe encontrar una propuesta por su ID (caso positivo)', async () => {
    const storedPropuesta: Propuesta = propuestasList[0];
    const propuesta: Propuesta = await service.findPropuestaById(storedPropuesta.id);
    expect(propuesta).not.toBeNull();
    expect(propuesta.titulo).toEqual(storedPropuesta.titulo);
  });



  it('findPropuestaById debe lanzar una excepción si la propuesta no es encontrada por su ID (caso negativo)', async () => {
    await expect(service.findPropuestaById(0)).rejects.toHaveProperty(
      'message',
      'Propuesta con id 0 no encontrada'
    );
  });
  


  it('findAllPropuesta debe retornar todas las propuestas (caso positivo)', async () => {
    const propuestas: Propuesta[] = await service.findAllPropuesta();
    expect(propuestas).not.toBeNull();
    expect(propuestas).toHaveLength(propuestasList.length);
  });

  it('deletePropuesta debe lanzar una excepción si la propuesta tiene un proyecto asociado (caso negativo)', async () => {
    const propuesta: Propuesta = propuestasList[0];
    propuesta.proyecto = await proyectoRepository.save({
      fechaInicio: new Date(),
      fechaFin: new Date(),
      url: faker.internet.url(),
      propuesta: null
    });
    await propuestaRepository.save(propuesta);
    await expect(service.deletePropuesta(propuesta.id)).rejects.toHaveProperty(
      'message',
      'La propuesta no se puede eliminar porque tiene un proyecto asociado'
    );
  });
});
