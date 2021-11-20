import path from "path";
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
app.use("/content", express.static(path.resolve(__dirname, "../client/build")));
app.use("*", (r, res, n) =>
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
);

server.listen(port, async () => {
  await Promise.all([initMongo(process.env.MONGO_URI)]);
  await fillDev();
  console.log("Сервер запущен на порту " + port);
});
