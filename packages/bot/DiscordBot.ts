import { Client, GatewayIntentBits } from "discord.js";
import { discordConfig } from "./Config";
import { Logger } from "@core/utils/Logger";
import { CommandHandler } from "@core/handlers/CommandHandler";
import { EventHandler } from "@core/handlers/EventHandler";
import { InteractionHandler } from "@core/handlers/InteractionHandler";
import chokidar from "chokidar";

export class DiscordBot {
  public client: Client;
  public commandHandler: CommandHandler;
  public eventHandler: EventHandler;
  public interactionHandler: InteractionHandler;

  constructor() {
    this.client = new Client({
      intents: discordConfig.intents.map(
        (intent) => GatewayIntentBits[intent as keyof typeof GatewayIntentBits]
      ),
    });
    this.commandHandler = new CommandHandler(this.client);
    this.eventHandler = new EventHandler(this.client);
    this.interactionHandler = new InteractionHandler(this.client);
  }

  public async init(): Promise<void> {
    const commandsPath = __dirname + "/commands";
    const eventsPath = __dirname + "/events";
    const interactionsPath = __dirname + "/interactions";

    await this.commandHandler.loadCommands(commandsPath).catch((error) => Logger.error(error));

    /* const watcher = chokidar.watch(commandsPath, {
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on("change", async (path) => {
      Logger.info(`Comando alterado: ${path}`);
      await this.commandHandler.reloadCommands(commandsPath).catch((error) => Logger.error(error));
      Logger.success("Comandos recarregados com sucesso!");
    }); */

    await this.eventHandler.loadEvents(eventsPath).catch((error) => Logger.error(error));
    await this.interactionHandler
      .loadInteractions(interactionsPath)
      .catch((error) => Logger.error(error));

    this.client.on("interactionCreate", async (interaction) => {
      if (interaction.isChatInputCommand()) {
        await this.commandHandler.handleInteraction(interaction);
      } else if (
        interaction.isButton() ||
        interaction.isSelectMenu() ||
        interaction.isModalSubmit()
      ) {
        await this.interactionHandler.handleInteraction(interaction);
      }
    });

    this.client.on("error", (error) => Logger.error(`Client error: ${error}`));
  }

  public start(): void {
    this.client
      .login(discordConfig.token)
      .then(() => Logger.success("Bot logado com sucesso!"))
      .catch((error) => Logger.error(`Falha ao logar: ${error}`));
  }
}
