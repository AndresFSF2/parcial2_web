/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Propuesta } from './propuesta.entity';

@Entity()
export class ProfesorEntity {
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

  @OneToMany(() => Propuesta, propuesta => propuesta.profesores)
   propuestas: PropuestaEntity[];
}
