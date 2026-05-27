import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma.service";
import { CreateUserDTO } from "../../../dto/create-user.dto";
import { UpdateUserDTO } from "../../../dto/update-user.dto";
import { IUserRepository } from "../user.repository.abstract";


@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({ data });
    
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }

  async update(id: string, data: UpdateUserDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}