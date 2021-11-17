import * as mongoose from "mongoose";

export const isCollection = <T extends Backend.DB.ModelSchema>(
  model: Backend.DB.ModelSchema,
  name: string
): model is T => model.collection.collectionName === name;

export const createModel = <T>(name: string, schema: mongoose.Schema<T>) => {
  return mongoose.model<Backend.DB.ModelSchema<T>>(name, schema);
};

export const createSchema = <T>(schema: Backend.DB.DbSchema<T>) =>
  new mongoose.Schema<T>(schema);
