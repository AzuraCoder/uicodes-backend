import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import chalk from "chalk";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 5000;
export const prisma = new PrismaClient();

async function main() {
  app.use(express.json());
  app.use(cors({ origin: "*" }));
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.json({
      message: "Welcome! to my server👋🏻",
    });
  });

  app.listen(port, () =>
    console.log(
      `${chalk.bgGreen(" INFO ")} Server running on ${chalk.blue.bold(
        `http://localhost:${port}`
      )}`
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log(
      `${chalk.bgGreen(" INFO ")} ${chalk.blue(
        "MongoDB connected successfully"
      )}`
    );
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    console.log(
      `${chalk.bgRed(" ERROR ")} MongoDB not connected : ${chalk.red(error)}`
    );
    process.exit(1);
  });
