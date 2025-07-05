import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ message: "GET THE USERS" });
});

userRouter.post("/", (req, res) => {
  res.send({ message: "CREATE USERS" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ message: "UPDATE THE USER" });
});

userRouter.delete("/user/:id", (req, res) => {
  res.send({ message: "DELETET THE USER" });
});
