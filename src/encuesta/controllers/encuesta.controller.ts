import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { EncuestaService } from '../providers/encuesta.service';
import { CreateEncuestaDto } from '../dto/encuesta/create-encuesta.dto';
import { UpdateEncuestaDto } from '../dto/encuesta/update-encuesta.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { CreateQuestDto } from '../dto/encuesta/create-quest.dto';

@Controller('encuesta')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  /*@Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestaService.create(createEncuestaDto);
  }*/

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
     return this.encuestaService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.encuestaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEncuestaDto: UpdateEncuestaDto,
  ) {
    return this.encuestaService.update(id, updateEncuestaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.encuestaService.remove(id);
  }


  @Post()
  createQuest(@Body() createQuestDto: CreateQuestDto) {
    return this.encuestaService.createQuest(createQuestDto);
  }
}
