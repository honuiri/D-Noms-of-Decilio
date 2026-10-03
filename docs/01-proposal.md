# Project Proposal

## App Name

**D' Noms of Decilio (DND)**

DND stands for **Do Not Disturb**, referring to being in the zone while cooking.

## What the App Is For

D' Noms of Decilio (DND) is a private family recipe web app that allows family members to record, organize, search, and revisit family recipes in one place.

The app is intended primarily for my family. Instead of having to ask family members for ingredients or cooking steps, recipes can be stored in one place and accessed whenever they are needed.

## Who Is It For

The app is intended for my family who wants to preserve our recipes and make them easier to find and reuse.

Family members can:
- Browse existing recipes
- Search for a specific recipe
- Filter recipes by category
- View ingredients and cooking steps
- Add new recipes
- Edit existing recipes
- Delete recipes

The recipe collection is protected by a family login.

## Core Features

The main features of DND are:

1. **Home**
   - Introduces the DND family recipe archive
   - Highlights recently added recipes

2. **Recipes**
   - Displays the family recipe collection
   - Searches recipes by name
   - Filters recipes by category
   - Displays recipe cards with basic recipe information

3. **Recipe Details**
   - Displays the recipe name and description
   - Displays ingredients and cooking steps
   - Allows the recipe to be edited or deleted

4. **Add/Edit Recipe**
   - Provides a form for creating a new recipe
   - Allows existing recipes to be updated
   - Stores ingredients and cooking steps as part of the recipe data

5. **Family Login**
   - Requires users to log in before accessing the recipe collection
   - Keeps the recipe collection intended for family use

## Data the App Holds

The main data stored by the application is recipe information.

### Recipe

```text
{
  id,
  name,
  description,
  image_url,
  created_at,
  ingredients,
  steps,
  category
}
```

The recipe data is stored in a PostgreSQL database hosted through Supabase.

Recipes can change when a family member adds, edits, or deletes a recipe.

The application also uses temporary search and category filter values while the user is browsing the recipe collection.

## What Each Screen Contains

### Home

- Header/navigation
- DND logo and branding
- Introduction to the family recipe archive
- Recently added recipe cards
- Footer

### Recipes

- Header/navigation
- Page heading
- Search bar
- Category filter
- Recipe cards
- Recipe name
- Recipe category
- Recipe image
- Link to recipe details
- Footer

### Recipe Details

- Header/navigation
- Recipe image
- Recipe name
- Description
- Ingredients
- Cooking steps
- Edit action
- Delete action
- Footer

### Add/Edit Recipe

- Header/navigation
- Recipe name input
- Description input
- Image URL input
- Category input
- Ingredients input
- Cooking steps input
- Save action
- Footer

### Login

- Login form
- Family username and password fields
- Access to the recipe collection after successful login

## Technology

### Front End

- React
- Vite
- React Router
- CSS

### Back End

- Node.js
- Express
- PostgreSQL
- `pg`
- CORS

### Database

- Supabase PostgreSQL

### Deployment

- Frontend: Render
- API: Render
- Database: Supabase

## Architecture

The application is divided into three main parts:

```text
User
  │
  ▼
React + Vite
(Render)
  │
  │ API requests
  ▼
Express API
(Render)
  │
  │ SQL queries
  ▼
PostgreSQL
(Supabase)
```

The React frontend sends recipe requests to the Express API. The API handles authentication, validates recipe data, and performs database operations using parameterized SQL queries. The PostgreSQL database hosted through Supabase stores the recipe collection.

Production credentials and database connection information are stored in environment variables rather than in the repository.

## Hosting

The project is deployed as separate frontend and backend services.

- **Frontend:** Render
- **API:** Render
- **Database:** Supabase PostgreSQL

The frontend connects to the deployed API using the `VITE_API_BASE_URL` environment variable.

The production API uses environment variables for its database connection and family login credentials.

## Core Requirements vs. Stretch Goals

### Core Features

The following are part of the main project:

- Family login
- Recipe browsing
- Recipe search
- Category filtering
- Recipe details
- Add recipe
- Edit recipe
- Delete recipe
- PostgreSQL database
- Express API
- Responsive/mobile navigation
- Deployment of the frontend and API

### Stretch Goals / Future Improvements

Features that may be added or improved after the core project include:

- Short cooking or recipe demonstration videos
- Replacing temporary recipe images with original family recipe photos
- Further visual and responsive improvements
- Additional recipe organization features

## Content and Assets

The project uses:

- Family recipe information
- Recipe names and categories
- Ingredients and cooking steps
- DND logo and branding assets
- Recipe photos

Recipe images currently used in the project are temporary images from the internet and are not owned by DND. These are intended to be replaced with our own family recipe images in the future.

## Risks and What Changed

### Frontend, Backend, and Database Connection

One of the main risks identified in the original proposal was connecting the React frontend to the Node/Express API and PostgreSQL database.

This was resolved during development by setting up the Express API, connecting it to the Supabase PostgreSQL database, and connecting the deployed React frontend to the API.

### Security and Access Control

Another challenge was determining how much security was needed for a family recipe application. The project now uses a family login, environment variables for production credentials, server-side recipe validation, parameterized database queries, CORS configuration, and Supabase database restrictions.

### Deployment

The project was originally planned to use a different frontend hosting setup, but the final deployment uses **Render for both the frontend and API**, with **Supabase for PostgreSQL**.

## Current Status

The main application functionality is complete.

The current project includes:

- Home page
- Recipes page
- Recipe Details page
- Add/Edit Recipe page
- Family login
- Search
- Category filtering
- Create, read, update, and delete recipe functionality
- Supabase PostgreSQL database
- Express API
- Responsive navigation
- Deployed frontend and API


## Original Project Risk

The original proposal identified two main concerns: balancing CRUD functionality with additional features such as search, and connecting the React frontend to the Node/Express API and PostgreSQL database. The project successfully implemented the core CRUD and search functionality, and the frontend, API, and database are now connected.