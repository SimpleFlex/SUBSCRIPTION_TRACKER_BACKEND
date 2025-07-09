import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.get("/sign-in", signIn);
