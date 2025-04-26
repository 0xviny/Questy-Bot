export function BuilderConstructor<T extends new (...args: any) => any>(
  BuilderClass: T,
  options: ConstructorParameters<T>[0]
) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get() {
        return new BuilderClass(options);
      },
      enumerable: true,
      configurable: true,
    });
  };
}
