import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException("Usuário com este e-mail não foi encontrado.");
    }

    delete user.password;
    return user;
  }
}