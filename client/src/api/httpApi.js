// The real client. Every function here talks to your Express API.
//
// Components do not call fetch directly. They import functions from
// index.js, which chooses between this real API and mockApi.js.

const BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;

    try {
      const body = await response.json();

      if (body?.error) {
        message = body.error;
      }
    } catch {
      // The response was not JSON.
    }

    throw new Error(message);
  }

  return response.status === 204 ? null : response.json();
}

export const listRecipes = () =>
  request("/api/recipes");

export const getRecipe = (id) =>
  request(`/api/recipes/${id}`);

export const createRecipe = (input) =>
  request("/api/recipes", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const updateRecipe = (id, input) =>
  request(`/api/recipes/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

export const deleteRecipe = (id) =>
  request(`/api/recipes/${id}`, {
    method: "DELETE",
  });