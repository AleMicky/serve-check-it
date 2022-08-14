import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { CreateRespuestaDto } from '../respuesta/create-respuesta.dto';

export class CreatePreguntaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  tipoRespuesta: string;

  @IsArray()
  @IsOptional()
  respuestas: CreateRespuestaDto[];
}
