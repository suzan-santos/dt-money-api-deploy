import { CreateUserService } from "./create-user.service";
import { DeleteUserService } from "./delete-user.service";
import { FindUserByIdService } from "./find-user-by-id.service";
import { FindUserByEmailService } from "./find-user-by-email.service";
import { UpdateUserService } from "./update-user.service";

export const userServices = [
  CreateUserService,
  DeleteUserService,
  FindUserByIdService,
  FindUserByEmailService,
  UpdateUserService,
];