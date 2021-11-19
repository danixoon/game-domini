import mongoose from "mongoose";
import { clearDb, fillDb } from "./queries";

export let db: mongoose.Mongoose = mongoose;
export const init = async (uri?: string) => {
  if (db) await db.disconnect();
  db = await mongoose.connect(uri ?? "mongodb://localhost");
  return db;
};

export const fillDev = async () => {
  await clearDb();
  await fillDb();
};
