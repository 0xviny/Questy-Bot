import { TextInputBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const TextInputConstructor = (options: ConstructorParameters<typeof TextInputBuilder>[0]) =>
  BuilderConstructor(TextInputBuilder, options);
