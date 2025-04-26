import { ButtonInteraction, MessageFlags } from "discord.js";
import { Button } from "@core/decorators/Button";
import type { IComponentInteraction } from "@core/handlers/InteractionHandler";

@Button({ customId: "btn_click" })
export default class ButtonInteractionHandler implements IComponentInteraction {
  public async execute(interaction: ButtonInteraction): Promise<void> {
    await interaction.reply({
      content: "Você clicou no botão! 🎉",
      flags: MessageFlags.Ephemeral,
    });
  }
}
