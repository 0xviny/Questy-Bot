import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { EVENT_METADATA_KEY, type EventOptions } from "../decorators/Event";

export interface IEvent {
  execute(...args: any[]): Promise<void>;
}

export class EventHandler {
  constructor(private client: Client) {}

  public async loadEvents(eventsPath: string): Promise<void> {
    const files = readdirSync(eventsPath).filter(
      (file) => file.endsWith(".js") || file.endsWith(".ts")
    );
    for (const file of files) {
      const eventModule = await import(join(eventsPath, file));
      const EventClass = eventModule.default;
      if (!EventClass) continue;

      const metadata: EventOptions = Reflect.getMetadata(EVENT_METADATA_KEY, EventClass);
      if (metadata) {
        const event: IEvent = new EventClass();
        if (metadata.once) {
          this.client.once(metadata.eventName, (...args: any[]) => event.execute(...args));
        } else {
          this.client.on(metadata.eventName, (...args: any[]) => event.execute(...args));
        }
      }
    }
  }
}
