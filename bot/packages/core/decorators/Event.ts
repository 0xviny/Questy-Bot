import "reflect-metadata";

export interface EventOptions {
  eventName: string;
  once?: boolean;
}

export const EVENT_METADATA_KEY = Symbol("EVENT_METADATA_KEY");

export function Event(options: EventOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(EVENT_METADATA_KEY, options, target);
  };
}
