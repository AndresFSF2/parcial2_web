/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from '../../estudiante/estudiante.entity/estudiante.entity';
import { Profesor } from '../../profesor/profesor.entity/profesor.entity';
import { Propuesta } from '../../propuesta/propuesta.entity/propuesta.entity';
import { Proyecto } from '../../proyecto/proyecto.entity/proyecto.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'proyectos_grado',
    entities: [Estudiante, Profesor, Propuesta, Proyecto],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Estudiante, Profesor, Propuesta, Proyecto]),
];
