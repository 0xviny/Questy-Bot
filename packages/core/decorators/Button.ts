import "reflect-metadata";

export interface ButtonOptions {
  customId: string;
}

export const BUTTON_METADATA_KEY = Symbol("BUTTON_METADATA_KEY");

export function Button(options: ButtonOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(BUTTON_METADATA_KEY, options, target);
  };
}
