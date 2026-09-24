// The only file your components import from.
//
// Swapping the simulated backend for the real API is controlled by one
// environment variable set at BUILD time.
//
// VITE_USE_MOCK_API=false -> your Express API at VITE_API_BASE_URL
// anything else, INCLUDING UNSET -> the browser-only fake
//
// Demo mode is the default so the client can run before the real API
// and database are deployed.

import * as mockApi from "./mockApi.js";
import * as httpApi from "./httpApi.js";

export const USING_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API !== "false";

const implementation = USING_MOCK_API ? mockApi : httpApi;

export const {
  listRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = implementation;