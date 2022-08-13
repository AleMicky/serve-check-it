import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 200,
  })
  nombre: string;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuestas, {
    onDelete: 'CASCADE',
  })
  pregunta: Pregunta;
}
