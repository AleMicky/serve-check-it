import { IsString, MinLength } from "class-validator";

export class CreatePreguntaDto {
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    tipoRespuesta: string;
}