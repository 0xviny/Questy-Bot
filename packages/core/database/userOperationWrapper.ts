export function withUserOperation<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    console.log("Iniciando operação de usuário...");
    try {
      const result = await fn(...args);
      console.log("Operação de usuário concluída com sucesso.");
      return result;
    } catch (error) {
      console.error("Erro durante operação de usuário:", error);
      throw error;
    }
  }) as T;
}
