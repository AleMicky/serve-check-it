import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Entity()
export class Encuesta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 200,
  })
  nombre: string;

  @Column('text')
  descripcion: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
    cascade: true,
  })
  preguntas?: Pregunta[];
}
