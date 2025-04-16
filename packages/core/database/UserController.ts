import { type IUser } from "./models/User";
import { UserService } from "./UserService";
import { withUserOperation } from "./userOperationWrapper";

class UserController {
  public create = withUserOperation(async (discordId: string, username: string): Promise<IUser> => {
    return await UserService.createUser(discordId, username);
  });

  public find = withUserOperation(async (discordId: string): Promise<IUser | null> => {
    return await UserService.findUserById(discordId);
  });

  public update = withUserOperation(
    async (discordId: string, update: Partial<IUser>): Promise<IUser | null> => {
      return await UserService.updateUser(discordId, update);
    }
  );

  public delete = withUserOperation(async (discordId: string): Promise<IUser | null> => {
    return await UserService.deleteUser(discordId);
  });
}

export const userController = new UserController();
