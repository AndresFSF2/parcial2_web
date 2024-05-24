import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Proyecto } from './proyecto.entity/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto])],
  providers: [ProyectoService],
  controllers: [ProyectoController],
})
export class ProyectoModule {}
