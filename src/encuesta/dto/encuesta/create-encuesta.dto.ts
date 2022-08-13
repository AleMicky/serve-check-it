import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEncuestaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
