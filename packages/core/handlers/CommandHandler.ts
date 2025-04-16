import { Client, ChatInputCommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { COMMAND_METADATA_KEY, type CommandOptions } from "../decorators/Command";

export interface ICommand {
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

export class CommandHandler {
  private commands: Map<string, ICommand> = new Map();

  constructor(private client: Client) {}

  public async loadCommands(commandsPath: string): Promise<void> {
    const files = readdirSync(commandsPath).filter(
      (file) => file.endsWith(".js") || file.endsWith(".ts")
    );

    for (const file of files) {
      const commandModule = await import(join(commandsPath, file));
      const CommandClass = commandModule.default;
      if (!CommandClass) continue;

      const metadata: CommandOptions = Reflect.getMetadata(COMMAND_METADATA_KEY, CommandClass);
      if (metadata) {
        const command: ICommand = new CommandClass();
        this.commands.set(metadata.name, command);
        metadata.aliases?.forEach((alias) => this.commands.set(alias, command));
      }
    }
  }

  public async reloadCommands(commandsPath: string): Promise<void> {
    this.commands.clear();
    await this.loadCommands(commandsPath);
  }

  public async handleInteraction(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const command = this.commands.get(interaction.commandName);
    if (command) await command.execute(interaction);
  }
}
