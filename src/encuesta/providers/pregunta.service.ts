import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pregunta } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class PreguntaService {
  private readonly logger = new Logger('EncuestaService');
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
  ) {}
  async findAll() {
    const pregunta = await this.preguntaRepository.find();
    return pregunta;
  }
}
