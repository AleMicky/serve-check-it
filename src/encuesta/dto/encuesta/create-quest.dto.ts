import { PartialType } from "@nestjs/mapped-types";
import { CreateEncuestaDto } from './create-encuesta.dto';
import { CreatePreguntaDto } from '../pregunta/create-pregunta.dto';
import { IsArray } from "class-validator";

export class CreateQuestDto  extends PartialType(CreateEncuestaDto) {
    @IsArray()
    preguntas: CreatePreguntaDto[]
}