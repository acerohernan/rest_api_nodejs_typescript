require("dotenv").config();
import express from "express";
import config from "config";
import log from "./utils/logger";
import { connectToDb } from "./utils/connectToDb";
import router from "./routes";
import { desearilizeUser } from "./middleware/desearializeUser";

const app = express();

app.use(express.json());

app.use(desearilizeUser);

app.use(router);

const port = config.get("port");

app.listen(port, () => {
  log.info(`App started at port ${port}`);

  connectToDb();
});
