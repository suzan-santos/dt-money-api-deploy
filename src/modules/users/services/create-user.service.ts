import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/create-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import * as bcrypt from "bcrypt";

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const emailExists = await this.userRepository.findByEmail(data.email);
    if (emailExists) {
      throw new ConflictException("Este e-mail já está em uso.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    
    const user = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    
    delete user.password;
    return user;
  }
}