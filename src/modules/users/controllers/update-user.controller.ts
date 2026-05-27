import { Body, Controller, HttpStatus, Param, Put, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { UpdateUserService } from "../services/update-user.service";

@ApiTags('users')
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put(':id')
  @ApiOperation({ summary: 'Alterar dados de um usuário' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuário alterado com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'E-mail já está em uso.' })
  @ApiBody({ type: UpdateUserDTO })
  async handle(@Param('id') id: string, @Body() data: UpdateUserDTO, @Res() res: Response) {
    const user = await this.updateUserService.execute(id, data);
    return res.status(HttpStatus.OK).json(user);
  }
}