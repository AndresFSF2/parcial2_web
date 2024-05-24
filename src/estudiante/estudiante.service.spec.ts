/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Estudiante } from './estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';
import { faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepository: Repository<Estudiante>;
  let estudiantesList: Estudiante[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepository = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await estudianteRepository.delete({});
    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: Estudiante = await estudianteRepository.save({
        nombre: faker.person.fullName(),
        codigo: faker.string.sample(10),
        numeroCreditos: faker.number.int({ min: 1, max: 200 }),
        propuesta: null,
      });
      estudiantesList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearEstudiante debe crear un estudiante (caso positivo)', async () => {
    const estudiante: Estudiante = {
      id: faker.datatype.number(),
      nombre: faker.name.fullName(),
      codigo: faker.datatype.string(10),
      numeroCreditos: faker.datatype.number({ min: 1, max: 200 }),
      proyecto: null,
    };
    const newEstudiante: Estudiante = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();
    const storedEstudiante: Estudiante = await estudianteRepository.findOne({ where: { id: newEstudiante.id } });
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante.nombre).toEqual(newEstudiante.nombre);
    expect(storedEstudiante.codigo).toEqual(newEstudiante.codigo);
  });

  it('crearEstudiante debe lanzar una excepción si el código no tiene 10 caracteres (caso negativo)', async () => {
    const estudiante: Estudiante = {
      id: faker.datatype.number(),
      nombre: faker.name.fullName(),
      codigo: faker.datatype.string(5),
      numeroCreditos: faker.datatype.number({ min: 1, max: 200 }),
      proyecto: null,
    };
    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty(
      'message',
      'El código de estudiante debe tener 10 caracteres'
    );
  });

  it('findEstudianteById debe encontrar un estudiante por su ID (caso positivo)', async () => {
    const storedEstudiante: Estudiante = estudiantesList[0];
    const estudiante: Estudiante = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre);
  });

  it('findEstudianteById debe lanzar una excepción si el estudiante no es encontrado por su ID (caso negativo)', async () => {
    await expect(service.findEstudianteById(0)).rejects.toHaveProperty(
      'message',
      'Estudiante con id 0 no encontrado'
    );
  });
});
