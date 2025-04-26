import { ChannelSelectMenuBuilder } from "discord.js";
import { BuilderConstructor } from "./BuilderConstructor";

export const ChannelSelectMenuConstructor = (
  options: ConstructorParameters<typeof ChannelSelectMenuBuilder>[0]
) => BuilderConstructor(ChannelSelectMenuBuilder, options);
