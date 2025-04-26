import { Client, ChatInputCommandInteraction, type ApplicationCommandData } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { COMMAND_METADATA_KEY, type CommandOptions } from "../decorators/Command";

export interface ICommand {
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export class CommandHandler {
  private commands = new Map<string, ICommand>();
  private definitions: ApplicationCommandData[] = [];

  constructor(
    private client: Client,
    private guildId?: string
  ) {
    this.client.once("ready", () => this.registerCommands());
    this.client.on("interactionCreate", (i) =>
      this.handleInteraction(i as ChatInputCommandInteraction)
    );
  }

  public async loadCommands(commandsPath: string): Promise<void> {
    const files = readdirSync(commandsPath).filter((f) => f.endsWith(".js") || f.endsWith(".ts"));

    for (const file of files) {
      const module = await import(join(commandsPath, file));
      const CommandClass = module.default;
      if (!CommandClass) continue;

      const meta: CommandOptions = Reflect.getMetadata(COMMAND_METADATA_KEY, CommandClass);
      if (meta) {
        const instance: ICommand = new CommandClass();
        this.commands.set(meta.name, instance);
        meta.aliases?.forEach((a) => this.commands.set(a, instance));
        console.log("[INFO]".yellow, `Command "${meta.name}" loaded!`.green);

        this.definitions.push({
          name: meta.name,
          description: meta.description,
        });
      }
    }
  }

  private async registerCommands() {
    if (!this.client.application) return;
    if (this.guildId) {
      await this.client.application.commands.set(this.definitions, this.guildId);
      console.log(
        `[INFO]`.yellow,
        `Registered ${this.definitions.length} commands to guild ${this.guildId}`.green
      );
    } else {
      await this.client.application.commands.set(this.definitions);
      console.log(`[INFO]`.yellow, `Registered ${this.definitions.length} global commands`.green);
    }
  }

  public async handleInteraction(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const cmd = this.commands.get(interaction.commandName);
    if (cmd) await cmd.execute(interaction);
  }
}
