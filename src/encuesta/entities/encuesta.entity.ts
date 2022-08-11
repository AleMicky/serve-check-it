import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
