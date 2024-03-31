const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { prisma } = require("./adapters.js");
const rootRouter = require("./routes/index.js");
const { csrfErrorHandler, doubleCsrfProtection } = require("./csrf.js");
const path = require("path");
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
const createMemoryStore = require("memorystore");
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const frontendDir = path.join(__dirname, "../../frontend/dist");

dotenv.config()

const port = process.env.PORT || 8000;

const app = express();

// app.use(express.static(frontendDir));
app.use(express.static('public'));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const MemoryStore = createMemoryStore(session);

app.use(
  session({
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // session cookie
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    // use random secret
    name: "sessionId", // don't omit this option
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(doubleCsrfProtection);
app.use(csrfErrorHandler);
app.use(rootRouter);

app.get("*", (req, res) => {
  if (!req.originalUrl.startsWith("/api")) {
    return res.sendFile(path.join(__dirname, ".", "index.html"));
    // return "Hello World!!"
  }
  return res.status(404).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});

module.exports = app;