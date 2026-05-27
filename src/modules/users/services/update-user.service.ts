import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import * as bcrypt from "bcrypt";

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO) {
    // 1. Verifica se o usuário existe
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }

    // 2. Se for alterar e-mail, verifica se o novo já existe
    if (data.email && data.email !== user.email) {
      const emailExists = await this.userRepository.findByEmail(data.email);
      if (emailExists) {
        throw new ConflictException("Este e-mail já está em uso.");
      }
    }

    // 3. Se for alterar senha, criptografa a nova senha
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.userRepository.update(id, data);
    delete updatedUser.password;
    return updatedUser;
  }
}