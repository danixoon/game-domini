// По факту это defaultSchemaResolver с Proxy, но парсит обращение по _id в id
export const createResolver = <T>(
  custom: Partial<Record<keyof T, (obj: T) => any>> = {}
) =>
  new Proxy(
    {},
    {
      get(t, p: string) {
        return (
          custom[p as keyof T] ||
          ((o: T) =>
            // Если в объекте отсутствует свойство и свойство id,
            // выбирается существующее свойство _id и при его отсутствии -
            // выводится undefined
            p in o ? o[p as keyof T] : p === "id" ? (o as any)["_id"] : o[p as keyof T])
        );
      },
    }
  ) as T;
