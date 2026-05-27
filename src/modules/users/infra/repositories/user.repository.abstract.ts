import { CreateUserDTO } from "../../dto/create-user.dto";
import { UpdateUserDTO } from "../../dto/update-user.dto";

export abstract class IUserRepository {
  abstract create(data: CreateUserDTO): Promise<any>;
  abstract findAll(): Promise<any[]>;
  abstract findById(id: string): Promise<any | null>;
  abstract findByEmail(email: string): Promise<any | null>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, data: UpdateUserDTO): Promise<any>;
}