// The simulated backend.
//
// This uses the same function names and return shapes as httpApi.js,
// so the React components cannot tell whether they are using the
// simulated backend or the real Express API.
//
// Data is stored in the visitor's browser using localStorage.

import seed from "./seed.json";

const KEY = "dnd:recipes";

const delay = (ms = 250) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function read() {
  const stored = localStorage.getItem(KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(KEY);
    }
  }

  localStorage.setItem(KEY, JSON.stringify(seed));

  return seed;
}

function write(rows) {
  localStorage.setItem(KEY, JSON.stringify(rows));

  return rows;
}

export async function listRecipes() {
  await delay();

  return read()
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    );
}

export async function getRecipe(id) {
  await delay();

  const found = read().find(
    (row) => String(row.id) === String(id)
  );

  if (!found) {
    throw new Error("Not found");
  }

  return found;
}

export async function createRecipe(input) {
  await delay();

  const rows = read();

  const nextId =
    rows.length > 0
      ? Math.max(...rows.map((row) => Number(row.id))) + 1
      : 1;

  const created = {
    ...input,
    id: nextId,
    created_at: new Date().toISOString(),
  };

  write([...rows, created]);

  return created;
}

export async function updateRecipe(id, input) {
  await delay();

  const rows = read();

  const index = rows.findIndex(
    (row) => String(row.id) === String(id)
  );

  if (index === -1) {
    throw new Error("Not found");
  }

  rows[index] = {
    ...rows[index],
    ...input,
  };

  write(rows);

  return rows[index];
}

export async function deleteRecipe(id) {
  await delay();

  const rows = read();

  const filtered = rows.filter(
    (row) => String(row.id) !== String(id)
  );

  if (filtered.length === rows.length) {
    throw new Error("Not found");
  }

  write(filtered);

  return null;
}