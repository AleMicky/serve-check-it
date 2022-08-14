import { IsString, MinLength } from "class-validator";

export class CreateRespuestaDto {

    @IsString()
    @MinLength(1)
    nombre: string;
    
}