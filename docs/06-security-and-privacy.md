# Security and privacy checklist

## Before the first push

- [x] `.env` is included in `.gitignore` and is not committed.
- [x] `.env.example` files contain placeholder values only.
- [x] No database connection string, password, or secret key is committed.
- [x] No student number, personal email, phone number, or home address is included in the repository.
- [x] No classmates' personal information is included in the project.
- [x] Production credentials are stored in Render environment variables.

## Application security

- [x] Database queries use parameterized SQL queries.
- [x] CORS is configured to allow the deployed frontend origin.
- [x] Website login credentials are stored as environment variables rather than in the source code.
- [x] API routes that modify recipe data require authentication.
- [x] Supabase database access is protected through project configuration and Row Level Security.
- [x] GitHub secret scanning and push protection are enabled.
- [x] The repository was checked for accidentally committed credentials before submission.

## Privacy

- [x] No real classmates' names, student numbers, emails, or personal information are included.
- [x] Recipe data used for the project does not contain private information from classmates.
- [x] The project is intended primarily as a family recipe archive.
- [x] Temporary recipe images from the internet are clearly acknowledged and will be replaced with our own family images in the future.
- [x] No unnecessary personal information is collected by the application.

## Known limitations and future improvements

The project uses a simple family login rather than a full user account system. Future versions could improve authentication and add more security controls such as stronger password handling, rate limiting, and additional server-side validation.

The temporary recipe images are also not owned by DND. They are currently used for demonstration purposes and will be replaced with our own family recipe images.