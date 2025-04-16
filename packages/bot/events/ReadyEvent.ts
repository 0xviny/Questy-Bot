import { Client } from "discord.js";
import { Event } from "@core/decorators/Event";
import { type IEvent } from "@core/handlers/EventHandler";
import { Logger } from "@core/utils/Logger";

@Event({
  eventName: "ready",
  once: true,
})
export default class ReadyEvent implements IEvent {
  public async execute(client: Client): Promise<void> {
    Logger.info(`Bot online como ${client.user?.tag}`);
  }
}
