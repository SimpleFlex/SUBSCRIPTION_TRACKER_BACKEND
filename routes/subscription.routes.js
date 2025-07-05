import { Router } from "express";

export const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ message: "GET THE SUBSCRIPTION" });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ message: "CREATE SUBSCRIPTION" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ message: "UPDATE SUBSCRIPTION ID" });
});

subscriptionRouter.delete("/user/:id", (req, res) => {
  res.send({ message: "DELETE SUBSCRIPTION BY USER ID" });
});
