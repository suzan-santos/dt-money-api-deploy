import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty({ description: 'Nome completo do usuário', example: 'Maria Silva' })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name!: string;

  @ApiProperty({ description: 'E-mail do usuário', example: 'maria@email.com' })
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email!: string;

  @ApiProperty({ description: 'Senha do usuário (mínimo de 6 caracteres)', example: '123456' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  password!: string;
}