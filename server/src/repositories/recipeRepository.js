import { pool } from "../../db/pool.js";

export async function getAllRecipes() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      description,
      image_url,
      created_at,
      ingredients,
      steps,
      category
    FROM recipes
    ORDER BY created_at DESC
  `);

  return result.rows;
}


export async function getRecipeById(id) {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        description,
        image_url,
        created_at,
        ingredients,
        steps,
        category
      FROM recipes
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function createRecipe(recipe) {
    const {
        name,
        description = "",
        image_url = null,
        ingredients = [],
        steps = [],
        category,
    } = recipe;

    const result = await pool.query(
        `
        INSERT INTO recipes
        (
        name,
        description,
        image_url,
        ingredients,
        steps,
        category
        )
        VALUES
        ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, description, image_url, JSON.stringify(ingredients), JSON/stringify(steps), category,]
    );

    return result.rows[0];
}

export async function updateRecipe(id, recipe) {
  const {
    name,
    description = "",
    image_url = null,
    ingredients = [],
    steps = [],
    category,
  } = recipe;

  const result = await pool.query(
    `
      UPDATE recipes
      SET
        name = $1,
        description = $2,
        image_url = $3,
        ingredients = $4,
        steps = $5,
        category = $6
      WHERE id = $7
      RETURNING *
    `,
    [
      name,
      description,
      image_url,
      JSON.stringify(ingredients),
      JSON.stringify(steps),
      category,
      id,
    ]
  );

  return result.rows[0] ?? null;
}

export async function deleteRecipe(id) {
    const result = await pool.query(
        `
        DELETE FROM recipes
        WHERE id = $1
        RETURNING id`, [id]
    );

    return result.rows[0] ?? null;
}