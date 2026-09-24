import express from "express";
import cors from "cors";
import { pool } from "../db/pool.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

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

  app.get("/healthz", (req, res) => {
    res.json({ status: "ok "});
  });

  app.get("/readyz", (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            status: "ready",
            database: "ok",
        });
    } catch (error) {
        console.error("Database readiness check failed: ", error);

        res.status(503).json({
            status: "not ready",
            database: "unavailable",
        });
    }
  });

  app.use("/api/recipes", recipeRoutes);

  export default app;