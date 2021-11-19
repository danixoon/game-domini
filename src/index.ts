import http from "http";
import express from "express";
import dotenv from "dotenv";
import graphqlMiddleware from "@backend/middleware/graphql";
import { init as initMongo, fillDev } from "@backend/db/index";

dotenv.config();

const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use("/graphql", graphqlMiddleware());
server.listen(port, async () => {
  await Promise.all([initMongo()]);
  await fillDev();
  console.log("Сервер запущен на порту " + port);
});
