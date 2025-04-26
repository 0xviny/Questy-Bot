import { RoleSelectMenuBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const RoleSelectMenuConstructor = (
  options: ConstructorParameters<typeof RoleSelectMenuBuilder>[0]
) => BuilderConstructor(RoleSelectMenuBuilder, options);
