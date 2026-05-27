import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindUserByEmailService } from "../services/find-user-by-email.service";

@ApiTags('users')
@Controller('users')
export class FindUserByEmailController {
  constructor(private readonly findUserByEmailService: FindUserByEmailService) {}

  @Get('search/email')
  @ApiOperation({ summary: 'Buscar um usuário pelo e-mail' })
  @ApiQuery({ name: 'email', description: 'E-mail do usuário', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuário retornado com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
  async handle(@Query('email') email: string, @Res() res: Response) {
    const user = await this.findUserByEmailService.execute(email);
    return res.status(HttpStatus.OK).json(user);
  }
}