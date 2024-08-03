import { Hono } from "hono";
import Router from "./router";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/post", Router);

export default app;
