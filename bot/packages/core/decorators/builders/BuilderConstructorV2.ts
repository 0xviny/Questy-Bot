import "reflect-metadata";
import type { AnyComponentBuilder } from "discord.js";

export const V2_BUILDERS = Symbol("v2_builders");

export function BuilderConstructorV2<T extends new () => AnyComponentBuilder>(
  BuilderClass: T,
  configure: (builder: InstanceType<T>) => void
): MethodDecorator {
  return (target, _key, _desc) => {
    const arr: { BuilderClass: T; configure: (b: InstanceType<T>) => void }[] =
      Reflect.getMetadata(V2_BUILDERS, target.constructor) || [];
    arr.push({ BuilderClass, configure });
    Reflect.defineMetadata(V2_BUILDERS, arr, target.constructor);
  };
}
