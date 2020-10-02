# nibble

https://docs.google.com/document/d/1V9t0_eSW7hAA2StlWDDHjjDPwIBTxm_iDs0mwhZYaP4/edit?usp=sharing

We want to solve the problem of storing and retrieving recipes for the general college student. Allowing users to add their own recipes, see other people’s recipes, and filter for recipes with some criteria. 

One user is using the website only to search for, discover, and read new recipes written by others. 
A goal of this user is to be able to filter recipes by certain criteria (ingredients, skill level, etc.)
Another goal of this user is to be able to download recipes to store locally. 
The second user utilizes the website to post their own recipes to store their own recipes as well as share their recipes with the general public. These users are not mutually exclusive. 
A goal of this user is to be able to post their own recipes to the website for other users to see.
Another goal of this user is to save/favorite other users recipes for easy future access.

2. 
	Backend (Node.js + MySQL):
Store recipe and user data in a relational database with CRUD operations
	Frontend (React):
Allow users to create an account/login
Allow users to post a recipe and have it saved to the database
Allow users to search recipes by certain criteria
Allow users to save/favorite recipes

3. We plan to try using a recipe-storing API such as Whisk: https://docs.whisk.com/, but if it is difficult to use or doesn’t suit our needs then we may implement our own database to store user and recipe information. The Whisk API allows us to create, read, update, and delete recipes, as well as have users favorite recipes and search recipes.
