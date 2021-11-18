type MongooseDocument = import("mongoose").Document;
type MongooseSchema = import("mongoose").Schema;
type SchemaDefinition<T> = import("mongoose").SchemaDefinition<T>;
type SchemaDefinitionType<T> = import("mongoose").SchemaDefinitionType<T>;
type ObjectId = import("mongodb").ObjectId;

declare namespace Backend.DB {
  type WithoutMongoId<T> = Omit<T, "_id">;

  type DbSchema<K> = Record<
    Exclude<K, "_id">,
    SchemaDefinition<SchemaDefinintionType<K>>[keyof SchemaDefinition<
      SchemaDefinintionType<K>
    >]
  >;

  type ModelSchema<T = {}> = T & MongooseDocument & { id: ObjectId };
  type WithPopulated<
    T extends object,
    K extends keyof T,
    P extends object
  > = ModelSchema<T> & Record<K, ModelSchema<P>>;

  interface CreateSchema {
    <T, S extends SchemaDefinition = DbSchema<keyof T>>(
      schema: S
    ): MongooseSchema<S>;
  }
}
