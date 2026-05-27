import { CreateUserController } from "./create-user.controller";
import { DeleteUserController } from "./delete-user.controller";
import { FindUserByIdController } from "./find-user-by-id.controller";
import { FindUserByEmailController } from "./find-user-by-email.controller";
import { UpdateUserController } from "./update-user.controller";

export const usersControllers = [
  CreateUserController,
  DeleteUserController,
  FindUserByIdController,
  FindUserByEmailController,
  UpdateUserController,
];