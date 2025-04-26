import { StringSelectMenuBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const StringSelectMenuConstructor = (
  options: ConstructorParameters<typeof StringSelectMenuBuilder>[0]
) => BuilderConstructor(StringSelectMenuBuilder, options);
