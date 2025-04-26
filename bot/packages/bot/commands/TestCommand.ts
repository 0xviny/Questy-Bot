import { Command } from "@core/decorators/Command";
import type { ICommand } from "@core/handlers/CommandHandler";
import {
  V2Message,
  TextDisplay,
  Section,
  Separator,
  MediaGallery,
  File,
  Button,
  StringSelect,
  UserSelect,
  RoleSelect,
  MentionableSelect,
  ChannelSelect,
} from "@core/decorators/builders/v2";
import type { ChatInputCommandInteraction } from "discord.js";
import { responseV2 } from "@core/responses/v2";

@V2Message()
@Command({ name: "test", description: "Teste V2 com decorators específicos" })
export default class TestCommand implements ICommand {
  @TextDisplay({ content: "🚀 Hello V2!" })
  @Separator()
  @Button({ customId: "btn_ok", label: "👍 OK", style: 1 })
  @StringSelect({
    customId: "sel_str",
    options: [
      { label: "One", value: "1" },
      { label: "Two", value: "2" },
    ],
  })
  @UserSelect({ customId: "sel_user" })
  @RoleSelect({ customId: "sel_role" })
  @MentionableSelect({ customId: "sel_mention" })
  @ChannelSelect({ customId: "sel_channel" })
  public async execute(interaction: ChatInputCommandInteraction) {
    await responseV2(this.constructor, interaction, "Aqui está o layout V2 completo!");
  }
}
