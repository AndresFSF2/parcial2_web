/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorService } from './profesor.service';
import { Profesor } from './profesor.entity/profesor.entity';
import { Propuesta } from '../propuesta/propuesta.entity/propuesta.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepository: Repository<Profesor>;
  let propuestaRepository: Repository<Propuesta>;
  let profesoresList: Profesor[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepository = module.get<Repository<Profesor>>(getRepositoryToken(Profesor));
    propuestaRepository = module.get<Repository<Propuesta>>(getRepositoryToken(Propuesta));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await profesorRepository.delete({});
    await propuestaRepository.delete({});
    profesoresList = [];
    for (let i = 0; i < 5; i++) {
      const profesor: Profesor = await profesorRepository.save({
        cedula: faker.datatype.number(),
        nombre: faker.name.firstName(),
        grupoInvestigacion: faker.helpers.arrayElement(['TICSW', 'IMAGINE', 'COMIT']),
        numeroExtension: faker.datatype.number(),
      });
      profesoresList.push(profesor);
    }
  };

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe crear un profesor (caso positivo)', async () => {
    const profesor: Profesor = {
      id: 0,
      cedula: faker.datatype.number(),
      nombre: faker.name.firstName(),
      grupoInvestigacion: 'TICSW',
      numeroExtension: faker.datatype.number(),
      propuestas: [],
    };
    const result = await service.crearProfesor(profesor);
    expect(result).toEqual(expect.objectContaining(profesor));
  });

  it('debe lanzar una excepción si el grupo de investigación no es válido (caso negativo)', async () => {
    const profesor: Profesor = {
      id: 0,
      cedula: faker.datatype.number(),
      nombre: faker.name.firstName(),
      grupoInvestigacion: 'INVALID',
      numeroExtension: faker.datatype.number(),
      propuestas: [],
    };
    await expect(service.crearProfesor(profesor)).rejects.toHaveProperty(
      'message',
      'El grupo de investigación debe ser uno de los siguientes: TICSW, IMAGINE, COMIT'
    );
  });

  it('debe encontrar un profesor por su ID (caso positivo)', async () => {
    const storedProfesor: Profesor = profesoresList[0];
    const result = await service.findProfesorById(storedProfesor.id);
    expect(result).toEqual(storedProfesor);
  });

  it('debe lanzar una excepción si el profesor no es encontrado por su ID (caso negativo)', async () => {
    await expect(service.findProfesorById(0)).rejects.toHaveProperty(
      'message',
      'Profesor con id 0 no encontrado'
    );
  });
});
