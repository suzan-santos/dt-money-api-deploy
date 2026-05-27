import { Controller, Delete, HttpCode, HttpStatus, Param, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteUserService } from "../services/delete-user.service";

@ApiTags('users')
@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir um usuário pelo ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Usuário excluído com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
  async handle(@Param('id') id: string, @Res() res: Response) {
    await this.deleteUserService.execute(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}