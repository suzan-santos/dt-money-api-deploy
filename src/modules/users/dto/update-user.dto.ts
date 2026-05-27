import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDTO {
  @ApiPropertyOptional({ description: 'Nome do usuário', example: 'Maria Silva' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'E-mail do usuário', example: 'maria@email.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Senha do usuário', example: '123456' })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}