import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import chalk from "chalk";
import "dotenv/config";
import { database } from "./src/database/index.js";
import router from "./src/router/index.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect To Database
database(process.env.DATABASE_URL);

app.use("/api", router);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome! to my server👋🏻",
  });
});

// PORT
const port = 5000;
app.listen(port, () =>
  console.log(
    `${chalk.bgGreen(" INFO ")} Server running on ${chalk.blue.bold(
      `http://localhost:${port}`
    )}`
  )
);
