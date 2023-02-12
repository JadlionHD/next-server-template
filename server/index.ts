import { createServer } from "http";
import { parse } from "url";
import next from "next";
import express from "express";
import ratelimit from "express-rate-limit";

const port = parseInt(process.env.PORT || "3000");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

app.prepare().then(() => {
  const server = express();

  // server.use(limiter);
  server.get("/api/hello", limiter, (req, res) => {
    res.json({ message: "Hello world" });
  });

  server.get("*/*", (req, res) => {
    // const parsedUrl = parse(req.url, true);
    // console.log({ url: req.url, parsedUrl });
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
