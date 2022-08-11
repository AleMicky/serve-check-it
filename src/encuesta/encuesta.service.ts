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
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { Encuesta } from './entities/encuesta.entity';

@Injectable()
export class EncuestaService {
  private readonly logger = new Logger('EncuestaService');

  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepository: Repository<Encuesta>,
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
    return await this.encuestaRepository.find({
      take: limit,
      skip: offset,
      //TODO
    });
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

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
