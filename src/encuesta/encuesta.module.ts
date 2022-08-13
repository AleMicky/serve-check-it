import { Module } from '@nestjs/common';
import { EncuestaService } from './providers/encuesta.service';
import { EncuestaController } from './controllers/encuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encuesta, Pregunta, Respuesta } from './entities';
import { PreguntaService } from './providers/pregunta.service';
import { PreguntaController } from './controllers/pregunta.controller';
  
@Module({
  controllers: [EncuestaController, PreguntaController],
  providers: [EncuestaService, PreguntaService],
  imports: [TypeOrmModule.forFeature([Encuesta, Pregunta,Respuesta])],
})
export class EncuestaModule {}
