import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateEncuestaDto } from '../dto/encuesta/create-encuesta.dto';
import { UpdateEncuestaDto } from '../dto/encuesta/update-encuesta.dto';
import { Encuesta, Pregunta, Respuesta } from '../entities';
import { CreateQuestDto } from '../dto/encuesta/create-quest.dto';

@Injectable()
export class EncuestaService {
  private readonly logger = new Logger('EncuestaService');

  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) {}

  async create(createEncuestaDto: CreateEncuestaDto) {
    try {
      const encuesta = this.encuestaRepository.create(createEncuestaDto);
      await this.encuestaRepository.save(encuesta);
      return encuesta;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const encuesta = await this.encuestaRepository.find({
      take: limit,
      skip: offset,
      relations: {
        preguntas: true,
      },
    });
    return encuesta;
  }

  async findOne(id: string) {
    const encuesta = await this.encuestaRepository.findOneBy({ id });
    if (!encuesta)
      throw new NotFoundException(`Encuesta with id ${id} not found`);
    return encuesta;
  }

  async update(id: string, updateEncuestaDto: UpdateEncuestaDto) {
    const encuesta = await this.encuestaRepository.preload({
      id: id,
      ...updateEncuestaDto,
    });

    if (!encuesta)
      throw new NotFoundException(`Encuesta with id: ${id} not found`);

    await this.encuestaRepository.save(encuesta);
    return encuesta;
  }

  async remove(id: string) {
    const encuesta = await this.findOne(id);
    await this.encuestaRepository.remove(encuesta);
  }

  async createQuest(createQuestDto: CreateQuestDto) {
    try {
      const { preguntas, ...encuesta } = createQuestDto;

      const quest = this.encuestaRepository.create({
        ...encuesta,
        preguntas: preguntas.map(({ nombre, tipoRespuesta, respuestas }) =>
          this.preguntaRepository.create({
            nombre,
            tipoRespuesta,
            respuestas: respuestas?.map(({ nombre }) =>
              this.respuestaRepository.create({ nombre }),
            ),
          }),
        ),
      });

      await this.encuestaRepository.save(quest);

      return { ...quest, preguntas };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
