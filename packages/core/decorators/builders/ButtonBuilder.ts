import { ButtonBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const ButtonConstructor = (options: ConstructorParameters<typeof ButtonBuilder>[0]) =>
  BuilderConstructor(ButtonBuilder, options);
