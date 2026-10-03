# Weekly Reports

## Week of 2026-09-23

**Done.**  
Started building the frontend, beginning with the Home page. Set up the Express backend and Supabase PostgreSQL database. Started connecting the frontend, backend, and database.

**Stuck.**  
I was initially unsure how the frontend, backend, and database should communicate and where different files and functions should go. I used AI assistance and worked through the setup to better understand how the different parts connect.

**Hours.**  
Roughly 15–20 hours.

**Next.**  
Finish the Recipes, Recipe Details, and Add/Edit Recipe pages and connect the main CRUD functionality.

---

## Week of 2026-09-27

**Done.**  
Finished the Home, Recipes, Recipe Details, and Add/Edit Recipe pages. Added mobile navigation with a hamburger menu and continued refining the CSS to match the Figma design. Added basic security measures to the website and backend.

**Stuck.**  
I had difficulty understanding which parts of the frontend, backend, and database needed to be protected. I also needed to make sure the security changes did not interfere with the application's normal functionality.

**Hours.**  
Roughly 15–20 hours.

**Next.**  
Deploy the frontend and backend and test the deployed application and database connection.

---

## Week of 2026-10-03

**Done.**  
Completed the DND website and deployed both the frontend and backend using Render. Connected the deployed application to the Supabase PostgreSQL database. Fixed the deployment issue where the frontend was still using the mock API instead of the real Express API. Verified that the deployed API returns the recipe data correctly and that recipes display properly on the deployed website. Completed the security checklist, README, and other required project documentation. Finished the remaining CSS refinements and final testing of the main features.

**Stuck.**  
The deployed frontend initially loaded the mock recipes instead of the real database recipes. I checked the deployed API directly and confirmed that the API was working correctly. The issue was with the frontend's Render environment configuration, which was still using the mock API. After updating the environment variables and redeploying, the frontend successfully connected to the real API and displayed the recipes.

**Hours.**  
Roughly 10–15 hours.

**Next.**  
No major development work is left. The project is completed and ready for the final submission and presentation.