import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindUserByIdService } from "../services/find-user-by-id.service";

@ApiTags('users')
@Controller('users')
export class FindUserByIdController {
  constructor(private readonly findUserByIdService: FindUserByIdService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário pelo ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuário retornado com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
  async handle(@Param('id') id: string, @Res() res: Response) {
    const user = await this.findUserByIdService.execute(id);
    return res.status(HttpStatus.OK).json(user);
  }
}