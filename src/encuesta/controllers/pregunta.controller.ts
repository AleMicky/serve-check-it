import { Controller, Get } from '@nestjs/common';
import { PreguntaService } from '../providers/pregunta.service';

@Controller('pregunta')
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntaService) {}
  @Get()
  findAll() {
    return this.preguntaService.findAll();
  }
}
