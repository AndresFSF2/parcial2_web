import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Propuesta } from './propuesta.entity';

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

  @ManyToOne(() => Propuesta, propuesta => propuesta.estudiantes)
  propuesta: Propuesta;
}
