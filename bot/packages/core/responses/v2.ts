import "reflect-metadata";
import type { ChatInputCommandInteraction } from "discord.js";
import { ContainerBuilder, MessageFlags } from "discord.js";
import { V2_FUNCS } from "@core/decorators/builders/v2";

export async function responseV2(
  commandClass: Function,
  interaction: ChatInputCommandInteraction,
  content?: string
) {
  const fns = (Reflect.getMetadata(V2_FUNCS, commandClass) || []) as Array<
    (c: ContainerBuilder) => void
  >;

  const container = new ContainerBuilder();
  for (const fn of fns) fn(container);

  const raw = container.toJSON();
  await interaction.reply({
    components: Array.isArray(raw) ? raw : [raw],
    flags: MessageFlags.IsComponentsV2,
  });
}
