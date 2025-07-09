import { aj } from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    // 1. Log incoming request details
    console.log("Incoming request:", {
      method: req.method,
      path: req.path,
      ip: req.ip,
      headers: {
        "user-agent": req.headers["user-agent"],
        authorization: !!req.headers.authorization, // Check if auth header exists
      },
    });

    const decision = await aj.protect(req, { requested: 2 });

    // 2. Log full decision details
    console.log("Arcjet decision:", {
      isDenied: decision.isDenied,
      reason: decision.reason?.constructor?.name || "none",
      rateLimit: decision.reason?.isRateLimit?.() || false,
      isBot: decision.reason?.isBot?.() || false,
    });

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Rate Limit exceeded" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Access Denied" });
      }
    }

    next();
  } catch (error) {
    // 3. Enhanced error logging
    console.error(`Arcjet Middleware Error:`, {
      message: error.message,
      stack: error.stack,
      request: {
        method: req.method,
        path: req.path,
      },
    });
    next(error);
  }
};

export default arcjetMiddleware;
