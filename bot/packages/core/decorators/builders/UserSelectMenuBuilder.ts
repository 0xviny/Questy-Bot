import { UserSelectMenuBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const UserSelectMenuConstructor = (
  options: ConstructorParameters<typeof UserSelectMenuBuilder>[0]
) => BuilderConstructor(UserSelectMenuBuilder, options);
