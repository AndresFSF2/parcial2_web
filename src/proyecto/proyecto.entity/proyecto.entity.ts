/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Estudiante } from '../../estudiante/estudiante.entity/estudiante.entity';
import { Propuesta } from 'src/propuesta/propuesta.entity/propuesta.entity';


@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  url: string;

  @OneToOne(() => Estudiante, estudiante => estudiante.proyecto)
  @JoinColumn()
  estudiante: Estudiante;

  @OneToOne(() => Propuesta, propuesta => propuesta.proyecto)
  @JoinColumn()
  propuesta: Propuesta;
}
