import { Hono } from "hono";
import {
  createPost,
  getPostById,
  getPosts,
} from "../controllers/postController";

const Router = new Hono();

Router.get("/", getPosts);
Router.get("/:id", getPostById);
Router.post("/", createPost);

export default Router;
