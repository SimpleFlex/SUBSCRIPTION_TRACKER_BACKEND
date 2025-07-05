import express from "express";
import { PORT } from "./config/env.js";
import { authRouter } from "./routes/auth.routes.js";
import { subscriptionRouter } from "./routes/subscription.routes.js";
import { userRouter } from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { connectDB } from "./database/mongodb.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Fixed: added parentheses

// Removed the first errorMiddleware (it was in wrong position)

app.use("/api/v1/auth", authRouter); // Fixed: changed from 'auths' to 'auth'
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

// Kept errorMiddleware only at the end (correct position)
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`this is runing in ${PORT}.....`);
  await connectDB();
});
