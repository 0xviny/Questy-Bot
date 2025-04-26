import { EmbedBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const EmbedConstructor = (options: ConstructorParameters<typeof EmbedBuilder>[0]) =>
  BuilderConstructor(EmbedBuilder, options);