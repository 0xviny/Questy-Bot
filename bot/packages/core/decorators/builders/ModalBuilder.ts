import { ModalBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const ModalConstructor = (options: ConstructorParameters<typeof ModalBuilder>[0]) =>
  BuilderConstructor(ModalBuilder, options);
