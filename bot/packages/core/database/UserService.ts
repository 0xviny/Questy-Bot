import User, { type IUser } from "./models/User";

export class UserService {
  public static async createUser(discordId: string, username: string): Promise<IUser> {
    const user = new User({ _id: discordId, username });
    return await user.save();
  }

  public static async findUserById(discordId: string): Promise<IUser | null> {
    return await User.findOne({ _id: discordId });
  }

  public static async updateUser(discordId: string, update: Partial<IUser>): Promise<IUser | null> {
    return await User.findOneAndUpdate({ _id: discordId }, update, { new: true });
  }

  public static async deleteUser(discordId: string): Promise<IUser | null> {
    return await User.findOneAndDelete({ _id: discordId });
  }
}
