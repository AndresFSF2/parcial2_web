/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Proyecto } from '../../proyecto/proyecto.entity/proyecto.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  numeroCreditos: number;

  @OneToOne(() => Proyecto, proyecto => proyecto.estudiante)
   @JoinColumn()
   proyecto: Proyecto;
}
