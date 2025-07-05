import mongoose from "mongoose";
import { NODE_ENV, MONGODB_URI } from "../config/env.js";

if (!MONGODB_URI) {
  throw new Error(
    `MONGODB_URI must be connected to .env<development/production>.local`
  );
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`the database is connected to the ${NODE_ENV} environment`);
  } catch (error) {
    console.log(
      `there was an error in connecting the database, ${error.message}`
    );
  }
};
