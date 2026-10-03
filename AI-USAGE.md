# AI usage

This project was built with AI assistance. This file is the record of it.

## 1. How I used AI

### 2026-09-24 - Set up Atomic Design Folders

- **Tool:** ChatGPT
- **What I asked for:** I asked AI how I could organize my React components using the Atomic Design structure.
- **What it gave back:** AI explained the purpose of the atoms, molecules, and organisms folders ans suggested how I could organize my components within them.
- **What I kept, what I changed, and why:** I used the suggested Atomic Design structure and created the atoms, molecules, and organisms folders together with their respective components. I kept this structure because it makes the React project more organized and separates components based on their level of complexity.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/8fcbaa55341de8f47ec7939c1946353f327baef5 

### 2026-09-24 - Set up page structure

- **Tool:** ChatGPT
- **What I asked for:** I asked AI how I could organize the different pages of my React application and what pagefiles I should initially create.
- **What it gave back:** AI suggested creating a pages folder and organizing the main pages of the application inside it, such as the homepage, recipes page, recipe details page, and add/edit recipe page.
- **What I kept, what I changed, and why:** I created the pages folder and added the initial page files together with their starting contents. I kept this structure because having each page in its own file make the application easier to organize and maintain.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/721cb934da3da5246d00723aaf2e3e750aca0b79 

### 2026-09-24 - Matched the website to the high-fidelity design

- **Tool:** ChatGPT
- **What I asked for:** I asked AI to help update App.jsx and styless.css so the website would better match my high-fidelity design.
- **What it gave back:** AI suggested and provided changed to the page structure and CSS styling, including layout, spacing, and other visual details.
- **What I kept, what I changed, and why:** I used the suggested changes as a starting point and adjusted them to match my high-fidelity design and the way I wanted the website to look. I kept the parts that matched my design and changed parts that did not fit.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/e9aedde696cf471e7ad24cf838dc29741dba0e27 

### 2026-09-24 - Added mobile navigation and responsive layout

- **Tool:** ChatGPT
- **What I asked for:** I asked AI to help make my website work better on mobile devices.
- **What it gave back:** AI provided respoinsive CSS changes and helped add a hamburger menu for the mobile navigation, along with adjsutments to the layout, spacing, text sizes, and other pages for smaller screens.
- **What I kept, what I changed, and why:** I kept the hamburger navigation and responsive layout changes that fit my website. I adjusted some of the spacing, sizes, and styling afterward to make the mobile view match my design better.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/89d7d9ce68bde7b839a98c36e67889adcd0a46fe 

### 2026-09-27 - Website authentication and security

- **Tool:** ChatGPT
- **What I asked for:** Help implementing a basic level of security for the DND website, specifically protecting the recipe API with username and password authentication and keeping the login credentials available while navigating the website.
- **What it gave back:** Guidance and code for using HTTP Basic Authentication, checking the username and password on the Express server, sending the credentials from the login page, storing the authenticated session in sessionStorage, and automatically attaching the credentials to recipe API requests.
- **What I kept, what I changed, and why:** I kept the basic authentication structure and the sessionStorage approach because they fit the project's requirement for a private family recipe archive. I also kept the server-side credential checking so the username and password are not simply validated on the client. I changed the navigation and login behavior to match my website's pages, so a successful login redirects to the Home page instead of staying on the login page.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/2debd48b083a3414e08fef9488c3232cb0d01022

### Y2026-09-28 - Deployment

- **Tool:** ChatGPT
- **What I asked for:** Help me understand and set up the deployment of my DND website, including the React frontend, Express API, environment variables, and Render deployment.
- **What it gave back:** Guidance on deploying the frontend and backend, configuring the API base URL, setting environment variables, and checking whether the deployed website was communicating correctly with the API.
- **What I kept, what I changed, and why:** I kept the deployment steps and configuration that matched the project template and my actual setup. I changed the environment variable values and deployment settings to match my own Render services and project structure. I also tested the deployed website myself to confirm that the login and recipe API were working.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/fef92b2ea0df07a0f37401611d2ef59c388c0197

## 2. Where the AI got it wrong

### Case 1 - Recipe dropdown styling

- **What it gave me:** AI provided CSS for the Recipes navigation dropdown, including its positioning, spacing, and appearance.
- **What was wrong with it:** The dropdown did not look right in my website. The spacing and positioning were not what I wanted, especially on mobile, sot he dropdown was not looking properly.
- **What I did instead:** I changed the CSS myself to adjust the dropdown's position, and mobile behavior so it matched my intended design and navigation.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/6c217436fcfde32a4ab34bf18efdc3d532f33e9d 

### Case 2 - Recipe details layout

- **What it gave me:** AI helped update the Recipe Details page to match my high-fidelity design, including layout, spacing, and grouping of the recipe information.
- **What was wrong with it:** The spacing and grouping of the elements did not match my preferred layout. Some parts were arranged differently from how I design them in my wireframe.
- **What I did instead:** I changed the spacing and regrouped some of the elements myself so the Recipe Details page was closer to mywireframe and the design I wanted.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/b8d2482d9144337817383c78839ef6d3a2ed3ce8 

### Case 3 - Navbar recipe category links

- **What it gave me:** AI added a Recipes dropdown in the navbar with links for categories such as Entree, Appetizer, Dessert, Soup, and Drink.
- **What was wrong with it:** When I clicked a category from the dropdown, it did not properly show the recipes page filtered to that category.
- **What I did instead:** I changed the navigation and filtering logic so that selecting a category from the navbar correctly takes me to the Recipes page with the selected category applied.
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/34f1c18e3fa092863541d7bab9921ea64542b7ce 

## 3. Who wrote what

### Written by me

- **File:** server/src/repositories/recipeRepository.js
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/2abef47364b2b6af4d8092e452325b1e25783de7
- **What it does and why it is built this way:** I wrote this file to handle the databse operations for the recipes. It contains functions for getting all recipes, getting one recipe by ID, creating a recipe, updating a recipe, and deleting a recipe. I used SQL queries to communicate with the PostgreSQL database. This part was easier for me to understand because we learned database queries, functions, and CRUD operations in class.

### The AI-written part I understand best

- **File:** client/src/components/molecules/RecipeCard.jsx
- **Commit:** https://github.com/honuiri/D-Noms-of-Decilio/commit/8fcbaa55341de8f47ec7939c1946353f327baef5#diff-6a4b5cb84698392e5f215cf9d9abd8863f3c9efb5d2c902e93c2482c6b85a054
- **What it does and why we kept it:** This component displays each recipe as a card. It receives the recipe information through the recipe prop and shows the recipe's image, name, and category. It also uses Link so that clicking the card takes the user to that recipe's details page. The image is shown only when the recipe has an image URL; otherwise, it displays, "No image" placeholder. I understand this part best because we learned React components, conditional rendering, and routing, so I can explain how the different parts work.
