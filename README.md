# D' Noms of Decilio (DND)

D' Noms of Decilio (DND) is a family recipe web application created to keep our family's recipes in one place. My family enjoys cooking and has recipes that we want to preserve, but we do not always have time to teach or explain the ingredients and cooking steps to each other. DND provides a simple way for family members to record, organize, and revisit these recipes.

The application is intended primarily for my family rather than as a public recipe-sharing platform. It allows users to browse recipes, search and filter the collection, view recipe details, and add, edit, or delete recipes.

**Live site:** https://d-noms-of-decilio.onrender.com

**API:** https://d-noms-of-decilio.onrender.com/healthz

**Demo video:** https://drive.google.com/drive/folders/1HWlZ0ZVv5LFGuHRc7mUuqTpDixHpx8Qo?usp=sharing

## Screenshots

## Login

<img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/133e6959-c62b-4410-bb2e-5b8ed3595af5" />

### Home

<img width="1904" height="943" alt="image" src="https://github.com/user-attachments/assets/7007665c-f4d3-4d03-868d-8b8ee7cae981" />

### Recipes

<img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/2274170f-2f19-42d2-b322-dd85e2573a7f" />

### Recipe Details

<img width="1906" height="942" alt="image" src="https://github.com/user-attachments/assets/3f0ac66b-93ae-4515-a35e-4ebe703191ca" />

### Add/Edit Recipe

<img width="1903" height="943" alt="image" src="https://github.com/user-attachments/assets/e38f6f5f-05c0-4a4d-8faf-9f000e24a847" />

### Mobile View

<img width="392" height="808" alt="image" src="https://github.com/user-attachments/assets/d98d817a-ba56-46ae-8ccc-03baca68c59d" />

## What it does

- Displays the family recipe collection
- Searches recipes by name
- Filters recipes by category
- Displays recipe descriptions, ingredients, and cooking steps
- Allows recipes to be added, edited, and deleted
- Stores recipe data using a PostgreSQL database
- Requires a family login before accessing the recipe collection

## Built with

### Front end

- React
- Vite
- React Router
- CSS

### Back end

- Node.js
- Express
- PostgreSQL
- `pg`
- CORS

### Deployment

- **Client:** Render
- **API:** Render
- **Database:** Supabase PostgreSQL

## How it works

DND uses a React and Vite client that communicates with an Express API.

The React client sends recipe requests to the deployed Express API. The API handles recipe operations and communicates with the PostgreSQL database hosted on Supabase.

The application also has a login gate for the family website. The login credentials are stored as environment variables on the API host and are not included in the repository.

```
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

## Running the project locally

### 1. Clone the repository

```bash
git clone https://github.com/honuiri/D-Noms-of-Decilio.git
cd D-Noms-of-Decilio
```

### 2. Set up the server

```bash
cd server
npm install
```

Create the environment file using the provided example:

```bash
cp .env.example .env
```

Fill in the required server environment variables, including the PostgreSQL connection string and website login credentials.

Then run the database setup:

```bash
npm run db:reset
```

Start the server:

```bash
npm run dev
```

The API will run locally on:

```text
http://localhost:3000
```

### 3. Set up the client

Open another terminal:

```bash
cd client
npm install
```

Create the client environment file:

```bash
cp .env.example .env
```

Set the API configuration:

```text
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3000
```

Then start the client:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Environment variables

Environment variables containing credentials or other private values are not committed to the repository. Placeholder values are provided in `.env.example`.

### Server

| Variable | Purpose |
| --- | --- |
| `PORT` | Port used by the Express server. The hosting provider supplies this in production. |
| `DATABASE_URL` | PostgreSQL connection string used by the API. |
| `CORS_ORIGINS` | Origins allowed to access the API. |
| `SITE_USERNAME` | Username for the website login. |
| `SITE_PASSWORD` | Password for the website login. |

### Client

| Variable | Purpose |
| --- | --- |
| `VITE_USE_MOCK_API` | Determines whether the client uses the mock API or the real Express API. |
| `VITE_API_BASE_URL` | Base URL of the Express API. |

> **Note:** Vite environment variables beginning with `VITE_` are included in the built client and should not contain passwords, database credentials, or private API keys.

## Deployment

### Frontend

The React frontend is deployed on **Render**.

The frontend is built with Vite and connects to the deployed Express API using the `VITE_API_BASE_URL` environment variable.

### API

The Express API is deployed on **Render**.

The production environment variables are configured in Render's environment settings rather than being committed to the repository.

The API provides health-check endpoints:

```text
/healthz
/readyz
```

`/healthz` checks whether the API process is running, while `/readyz` checks whether the API can connect to the database.

### Database

The application uses PostgreSQL hosted through **Supabase**.

The database contains the `recipes` table with fields for the recipe name, description, image URL, creation date, ingredients, steps, and category.

## Security

DND includes several basic security measures appropriate for the project:

- Environment files containing credentials are excluded through `.gitignore`.
- `.env.example` contains placeholder values instead of real credentials.
- Website login credentials are stored as environment variables on the API host.
- Recipe API routes are protected by the login authentication layer.
- User-submitted recipe data is validated on the server.
- Database queries use PostgreSQL parameterized queries.
- CORS is configured through allowed origins.
- Production credentials are not stored in the repository.
- GitHub secret scanning and push protection are enabled.
- Database access is restricted through the Supabase project configuration and network settings.

See [`SECURITY-CHECKLIST.md`](SECURITY-CHECKLIST.md) for the project's security review.

## Project structure

```text
D-Noms-of-Decilio/
│
├── client/
│   ├── public/
│   │   └── ...
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   │   └── RecipeCard.jsx
│   │   │   └── organisms/
│   │   │       ├── Header.jsx
│   │   │       └── Footer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── RecipesPage.jsx
│   │   │   ├── RecipeDetailsPage.jsx
│   │   │   └── AddEditRecipePage.jsx
│   │   │
│   │   ├── api/
│   │   │   ├── index.js
│   │   │   ├── httpApi.js
│   │   │   ├── mockApi.js
│   │   │   └── seed.json
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── recipeController.js
│   │   │
│   │   ├── routes/
│   │   │   └── recipeRoutes.js
│   │   │
│   │   ├── repositories/
│   │   │   └── recipeRepository.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── db/
│   │   ├── pool.js
│   │   ├── run.js
│   │   ├── schema.sql
│   │   └── seed.sql
│   │
│   ├── .env.example
│   └── package.json
│
├── docs/
│   └── ...
│
├── .env.example
├── .gitignore
├── AI-USAGE.md
├── LICENSE
├── README.md
└── SECURITY-CHECKLIST.md
```

## Architecture

DND is divided into three main parts: the React front end, the Express API, and the PostgreSQL database. The React client is hosted on Render and sends recipe requests to the Express API, which is also hosted on Render. The Express API validates requests, handles authentication, and performs parameterized SQL queries against the PostgreSQL database hosted on Supabase. Environment variables are used for production credentials and database connection details.

## Image credits

Some recipe images currently used in the project are temporary images from the internet and are not owned by DND. Credits belong to their respective owners. These images will be replaced with our own family recipe images in the future.

## Author

**Yohanna A. Decilio**  
BS Computer Science — 6APSI  
Holy Angel University

## AI use

This project was built with AI assistance during development. AI was used for tasks including code assistance, debugging, explaining technical concepts, reviewing implementation choices, and helping with documentation.

The final implementation was reviewed, tested, and adapted by the author to fit the project's requirements.

[![Built with AI assistance](https://img.shields.io/badge/built%20with-AI%20assistance-0b5fff)](AI-USAGE.md)

For the detailed record of AI use, see [`AI-USAGE.md`](AI-USAGE.md).

## Licence

MIT License. See [`LICENSE`](LICENSE) for the full license.
