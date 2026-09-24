import fs from "node:fs/promises";
import process from "node:process";
import { pool } from "./pool.js";

const file = process.argv[2];

if (!file) {
  console.error("Usage: node db/run.js <sql-file>");
  process.exit(1);
}

try {
  const sql = await fs.readFile(file, "utf8");

  await pool.query(sql);

  console.log(`Executed ${file}`);
} catch (error) {
  console.error(`Failed to execute ${file}`);
  console.error(error);
  process.exitCode = 1;
} finally {
  await pool.end();
}