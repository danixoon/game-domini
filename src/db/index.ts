import mongoose from "mongoose";

export let db: mongoose.Mongoose = mongoose;
export const init = async (uri?: string) => {
  if (db) await db.disconnect();
  db = await mongoose.connect(uri ?? "mongodb://localhost");
  return db;
};
