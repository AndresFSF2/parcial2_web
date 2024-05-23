/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Profesor } from '../../profesor/profesor.entity/profesor.entity';
import { Proyecto } from '../../proyecto/proyecto.entity/proyecto.entity';


@Entity()
export class Propuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  palabraClave: string;

  @ManyToOne(() => Profesor, profesor => profesor.propuestas)
  profesor: Profesor;

  @OneToOne(() => Proyecto, proyecto => proyecto.propuesta)
   @JoinColumn()
   proyecto: Proyecto;
}
