import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db/pool.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

/* =========================================================
   WEBSITE PASSWORD
========================================================= */

function requireBasicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="DND"');
    return res.status(401).send("Authentication required.");
  }

  const encodedCredentials = authHeader.slice("Basic ".length);

  const decodedCredentials = Buffer.from(
    encodedCredentials,
    "base64"
  ).toString("utf8");

  const separatorIndex = decodedCredentials.indexOf(":");

  if (separatorIndex === -1) {
    res.setHeader("WWW-Authenticate", 'Basic realm="DND"');
    return res.status(401).send("Invalid credentials.");
  }

  const username = decodedCredentials.slice(0, separatorIndex);
  const password = decodedCredentials.slice(separatorIndex + 1);

  if (
    username !== process.env.SITE_USERNAME ||
    password !== process.env.SITE_PASSWORD
  ) {
    res.setHeader("WWW-Authenticate", 'Basic realm="DND"');
    return res.status(401).send("Invalid credentials.");
  }

  next();
}

/* =========================================================
   HEALTH CHECKS
========================================================= */

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/readyz", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "ready",
      database: "ok",
    });
  } catch (error) {
    console.error("Database readiness check failed:", error);

    res.status(503).json({
      status: "not ready",
      database: "unavailable",
    });
  }
});

/* =========================================================
   RECIPE API
========================================================= */

app.use("/api/recipes", requireBasicAuth, recipeRoutes);

/* =========================================================
   REACT FRONTEND
========================================================= */

const clientPath = path.join(__dirname, "../../client/dist");

app.use(requireBasicAuth, express.static(clientPath));

app.get("*", requireBasicAuth, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

export default app;

// import express from "express";
// import cors from "cors";
// import { pool } from "../db/pool.js";
// import recipeRoutes from "./routes/recipeRoutes.js";

// const app = express();

// const allowedOrigins = (process.env.CORS_ORIGINS || "")
//   .split(",")
//   .map((origin) => origin.trim())
//   .filter(Boolean);

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.length === 0) {
//         return callback(null, true);
//       }

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//   })
// );

// app.use(express.json());

// app.get("/healthz", (req, res) => {
//   res.json({ status: "ok" });
// });

// app.get("/readyz", async (req, res) => {
//   try {
//     await pool.query("SELECT 1");

//     res.json({
//       status: "ready",
//       database: "ok",
//     });
//   } catch (error) {
//     console.error("Database readiness check failed:", error);

//     res.status(503).json({
//       status: "not ready",
//       database: "unavailable",
//     });
//   }
// });

// /* =========================================================
//    WEBSITE PASSWORD
// ========================================================= */

// function requireBasicAuth(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Basic ")) {
//     res.setHeader("WWW-Authenticate", 'Basic realm="DND"');
//     return res.status(401).send("Authentication required.");
//   }

//   const encodedCredentials = authHeader.slice("Basic ".length);
//   const decodedCredentials = Buffer.from(
//     encodedCredentials,
//     "base64"
//   ).toString("utf8");

//   const separatorIndex = decodedCredentials.indexOf(":");

//   if (separatorIndex === -1) {
//     res.setHeader("WWW-Authenticate", 'Basic realm="DND"');
//     return res.status(401).send("Invalid credentials.");
//   }

//   const username = decodedCredentials.slice(0, separatorIndex);
//   const password = decodedCredentials.slice(separatorIndex + 1);

//   if (
//     username !== process.env.SITE_USERNAME ||
//     password !== process.env.SITE_PASSWORD
//   ) {
//     res.setHeader("WWW-Authenticate", 'Basic realm="DND"');
//     return res.status(401).send("Invalid credentials.");
//   }

//   next();
// }

// app.use("/api/recipes", recipeRoutes);

// export default app;