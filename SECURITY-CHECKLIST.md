# Security checklist template

Copy this into your workspace `project/SECURITY-CHECKLIST.md` and fill it in
before you make your project repository public.

Every row gets one of **Yes**, **No** or **N/A**, and one line of evidence in
your own words: what you checked, where, and what you found. "N/A" is a correct
answer when it is true, but it needs its reason. A blank row scores nothing, and
a Yes your repository contradicts scores nothing either.

Replace the example evidence with your own.

## Secrets and credentials
| # | Check | Yes / No / N/A | Evidence |
|---|---|---|---|
| 1 | `.env` is gitignored and is not in the repository | **Yes** | `.gitignore` excludes `.env`, `client/.env`, and `.env.*`; `.env.example` is explicitly allowed. |
| 2 | A `.env.example` with placeholder values only is committed | **Yes** | `.env.example` contains placeholders for `PORT`, `DATABASE_URL`, `CORS_ORIGINS`, `SITE_USERNAME`, and `SITE_PASSWORD`, with no real credentials. |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | **Yes** | The server reads credentials from environment variables such as `DATABASE_URL`, `SITE_USERNAME`, and `SITE_PASSWORD`; no real credentials were included in the source files checked. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | **Yes** | I checked my commits and did not commit any secrets or credentials. |
| 5 | Any credential that was ever committed has been rotated | **N/A** | No credentials were ever committed to the repository, so there was nothing to rotate. |
| 6 | Production credentials live only in my hosting provider's environment settings | **Yes** | Production credentials were entered in the API host's environment settings rather than committed to the repository. |


## GitHub Actions

If your project has no workflows, mark every row N/A and say so once.

| # | Check | Yes / No / N/A | Evidence |
|---|---|---|---|
| 7 | No secret value is written literally in any workflow YAML file | **Yes** | The GitHub Actions workflow does not contain database passwords, API keys, or other secret values. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | **N/A** | The GitHub Actions workflow does not use repository secrets. The required client deployment variables are not secret credentials. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | **Yes** | The workflow does not echo, dump, or debug-print secret values. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | **Yes** | `.env` files and build output are gitignored, and the client build contains only the public frontend configuration required for deployment. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | **N/A** | The project does not use GitHub Actions workflows for deployment; the frontend and API are deployed through Render. |
| 12 | Secret scanning and push protection are enabled on the repository | **Yes** | GitHub secret scanning and push protection are enabled for the repository. |

## Database

| # | Check | Yes / No / N/A | Evidence |
|---|---|---|---|
| 13 | Every query taking user input uses parameters, never string concatenation | **Yes** | `server/src/repositories/recipeRepository.js` uses PostgreSQL parameter placeholders such as `$1` and passes user values separately. |
| 14 | The database is not open to the whole internet, or is reachable only by the app | **Yes** | Supabase indicates that access to the project is restricted to the account/project access rather than being openly accessible to public users. |
| 15 | The database user the app connects as has only the permissions it needs | **No** | Supabase's roles are managed/protected, but I did not verify the exact permissions of the database role used by the Render API. |
| 16 | Seed and sample data is invented, not real people's data | **Yes** | The database seed data consists of sample/invented recipe information and does not contain real people's personal data. |
| 17 | Debug, seed and reset routes are removed before going public | **Yes** | `server/src/routes/recipeRoutes.js` contains only recipe CRUD routes. There are no debug, seed, or reset API routes. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
|---|---|---|---|
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login | **Yes** | DND uses an app-level login with a username and password. The API protects `/api/recipes` with `requireBasicAuth`. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | **No** | Supabase RLS is enabled, but this checklist item requires confirming signed-out access was tested. The DND API also connects directly through its PostgreSQL connection. |
| 20 | If Zero Trust: ... If an app password: the credentials are in my private workspace `project/README.md` | **N/A** | DND uses an app-level password rather than Cloudflare Zero Trust. The actual credentials are kept in environment variables and should not be placed in the public repository README. |
| 21 | The gate covers every route, including the ones that only change data | **Yes** | All `/api/recipes` routes are mounted through `requireBasicAuth`, covering GET, POST, PUT, and DELETE operations. |
| 22 | The credentials for the gate are environment variables, not in source | **Yes** | `server/src/app.js` compares the supplied credentials against `process.env.SITE_USERNAME` and `process.env.SITE_PASSWORD`. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
|---|---|---|---|
| 23 | Input from the user is validated on the server, not only in the browser | **Yes** | `recipeController.js` validates recipe input on the server, including required name/category fields and length limits. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | **Yes** | Recipe data is rendered through React components as text rather than being inserted with `dangerouslySetInnerHTML`. |
| 25 | Error responses do not expose stack traces, file paths or connection details | **Yes** | Controllers log detailed errors server-side but return generic messages such as `"Failed to create recipe"` to the client. |
| 26 | CORS is not a wildcard on routes that change data | **Yes** | `app.js` uses `CORS_ORIGINS` and checks incoming origins against the configured allowed-origin list rather than explicitly using `*`. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
|---|---|---|---|
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | **Yes** | I checked the project content and did not include student numbers, personal emails, phone numbers, or home addresses. |
| 28 | No classmate's personal data in the repository | **Yes** | The project does not contain classmates' personal information. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | **Yes** | Dependencies are declared in `client/package.json` and `server/package.json`, and `node_modules/` is excluded by `.gitignore`. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | **No** | Google Fonts are used, but some recipe images currently come from the internet and are not owned by DND. A small credit note is added to Home Page. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | **Yes** | The GitHub repository is intentionally public for the required project/deployment setup, and its current visibility was checked. |

## Anything I found and fixed

The checklist helped me identify that some of the temporary recipe images used in the project are not owned by DND. I will add a small credit notice to the Home page and replace the temporary images with our own family images in the future.
