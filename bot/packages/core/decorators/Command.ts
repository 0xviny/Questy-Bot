import "reflect-metadata";

export interface CommandOptions {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
}

export const COMMAND_METADATA_KEY = Symbol("COMMAND_METADATA_KEY");

export function Command(options: CommandOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(COMMAND_METADATA_KEY, options, target);
  };
}
