import { ButtonBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "@core/decorators/Command";
import { type ICommand } from "@core/handlers/CommandHandler";
import { EmbedConstructor } from "@core/decorators/builders/EmbedBuilder";
import { ButtonConstructor } from "@core/index";
import { buildComponentRows } from "@core/handlers/ComponentHandler";

@Command({
  name: "ping",
  description: "Responde com Pong!",
  aliases: ["p"],
})
export default class PingCommand implements ICommand {
  @EmbedConstructor({
    title: "🏓 Pong!",
    description: "Resposta com embed.",
    color: 0x00ff00,
  })
  embed!: EmbedBuilder;

  @ButtonConstructor({
    label: "Clique aqui!",
    custom_id: "btn_click",
    style: 1,
  })
  button!: ButtonBuilder;

  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({ embeds: [this.embed], components: buildComponentRows(this.button) });
  }
}
