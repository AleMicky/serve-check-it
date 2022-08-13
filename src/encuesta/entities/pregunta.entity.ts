import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Encuesta } from './encuesta.entity';
import { Respuesta } from './respuesta';

@Entity()
export class Pregunta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 200,
  })
  nombre: string;

  @Column({
    length: 100,
  })
  tipoRespuesta: string;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas, {
    onDelete: 'CASCADE',
  })
  encuesta: Encuesta;

  @OneToMany(() => Respuesta, (respuesta) => respuesta, { cascade: true })
  respuestas?: Respuesta[];
}
