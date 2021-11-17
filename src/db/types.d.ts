type MongooseDocument = import("mongoose").Document;
type MongooseSchema = import("mongoose").Schema;
type SchemaDefinition = import("mongoose").SchemaDefinition;
type ObjectID = import("mongodb").ObjectID;

declare namespace Backend.DB {
  type WithoutMongoId<T> = Omit<T, "_id">;

  type DbSchema<K> = Record<
    Exclude<K, "_id">,
    SchemaDefinition[keyof SchemaDefinition]
  >;

  type ModelSchema<T = {}> = T & MongooseDocument & { id: ObjectID };
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
