import {
  Client,
  ButtonInteraction,
  SelectMenuInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BUTTON_METADATA_KEY } from "../decorators/Button";
import { SELECT_MENU_METADATA_KEY } from "../decorators/SelectMenu";
import { MODAL_METADATA_KEY } from "../decorators/Modal";

export interface IComponentInteraction {
  execute(
    interaction: ButtonInteraction | SelectMenuInteraction | ModalSubmitInteraction
  ): Promise<void>;
}

export class InteractionHandler {
  private interactions: Map<string, IComponentInteraction> = new Map();

  constructor(private client: Client) {}

  public async loadInteractions(interactionPath: string): Promise<void> {
    const files = readdirSync(interactionPath).filter(
      (file) => file.endsWith(".js") || file.endsWith(".ts")
    );
    for (const file of files) {
      const interactionModule = await import(join(interactionPath, file));
      const InteractionClass = interactionModule.default;
      if (!InteractionClass) continue;
      const buttonMeta = Reflect.getMetadata(BUTTON_METADATA_KEY, InteractionClass);
      const selectMeta = Reflect.getMetadata(SELECT_MENU_METADATA_KEY, InteractionClass);
      const modalMeta = Reflect.getMetadata(MODAL_METADATA_KEY, InteractionClass);
      let customId: string | undefined;
      if (buttonMeta) customId = buttonMeta.customId;
      else if (selectMeta) customId = selectMeta.customId;
      else if (modalMeta) customId = modalMeta.customId;
      if (customId) {
        const component: IComponentInteraction = new InteractionClass();
        this.interactions.set(customId, component);
      }
    }
  }

  public async handleInteraction(
    interaction: ButtonInteraction | SelectMenuInteraction | ModalSubmitInteraction
  ): Promise<void> {
    const handler = this.interactions.get(interaction.customId);
    if (handler) await handler.execute(interaction);
  }
}
