/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { Profesor } from './profesor/profesor.entity/profesor.entity';
import { Estudiante } from './estudiante/estudiante.entity/estudiante.entity';
import { Proyecto } from './proyecto/proyecto.entity/proyecto.entity';
import { Propuesta } from './propuesta/propuesta.entity/propuesta.entity';


@Module({
  imports: [ProfesorModule, EstudianteModule, PropuestaModule, ProyectoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'proyectos_grado',
      entities: [Profesor, Estudiante, Propuesta, Proyecto],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
 })
 export class AppModule {}