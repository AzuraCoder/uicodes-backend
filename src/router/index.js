import express from "express";
import { getUser, login, register } from "../controllers/UserController.js";
import { authToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authToken, getUser);

export default router;
