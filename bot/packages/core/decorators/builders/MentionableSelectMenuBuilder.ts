import { MentionableSelectMenuBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const MentionableSelectMenuConstructor = (
  options: ConstructorParameters<typeof MentionableSelectMenuBuilder>[0]
) => BuilderConstructor(MentionableSelectMenuBuilder, options);
