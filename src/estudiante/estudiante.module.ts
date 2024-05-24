import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './estudiante.entity/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  providers: [EstudianteService],
  controllers: [EstudianteController],
})
export class EstudianteModule {}
