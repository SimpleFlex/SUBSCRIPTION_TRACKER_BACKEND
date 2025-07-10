import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";

export const aj = arcjet({
  key: ARCJET_KEY,
  // Only use IP for characteristics since user-agent is problematic
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "DRY_RUN" }), // Disable during testing
    detectBot({
      mode: "LIVE",
      allow: ["BOT:POSTMAN", "USER_AGENT:PostmanRuntime*"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 10,
      capacity: 20,
    }),
  ],
});
