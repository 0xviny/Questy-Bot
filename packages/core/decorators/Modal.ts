import "reflect-metadata";

export interface ModalOptions {
  customId: string;
}

export const MODAL_METADATA_KEY = Symbol("MODAL_METADATA_KEY");

export function Modal(options: ModalOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MODAL_METADATA_KEY, options, target);
  };
}
