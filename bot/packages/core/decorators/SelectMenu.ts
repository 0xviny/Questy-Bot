import "reflect-metadata";

export interface SelectMenuOptions {
  customId: string;
}

export const SELECT_MENU_METADATA_KEY = Symbol("SELECT_MENU_METADATA_KEY");

export function SelectMenu(options: SelectMenuOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(SELECT_MENU_METADATA_KEY, options, target);
  };
}
