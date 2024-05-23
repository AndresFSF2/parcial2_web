/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Propuesta } from '../../propuesta/propuesta.entity/propuesta.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoInvestigacion: string;

  @Column()
  numeroExtension: number;

  @OneToMany(() => Propuesta, propuesta => propuesta.profesor)
  propuestas: Propuesta[];
}
