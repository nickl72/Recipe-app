# Recipe-app

## Project Links
- [github repo](https://github.com/nickl72/Recipe-app/tree/main "github repository")
- [deployment](https://nick-and-david-recipe-app.herokuapp.com/ "Recipe App")
- [random recipe api used - TheMealDB.com] (https://www.themealdb.com/)

## ERD
![image](https://i.imgur.com/DRXrNjg.jpg)

## WireFrame
![image](https://imgur.com/F4mJNGx.png)
- Wire frames show are main six main ejs pages.

## MVP
-	Users can sign up/log in 
-	Users have CRUD functionality on their recipes
-	Home page is accessible to anyone and displays selection of recipes to view
-	Recipes show ingredients, instructions, image, and reviews
-	Logged in users can review and rate recipes
-	Recipes will accept unlimited number of instructions and ingredients
-	Implement auth functionality after login
-	Profile page displays user’s created recipes

## Post MVP
-	Display average rating for recipes
-	Users can add ingredients they own to their profile
-	Recipes highlight ingredients user already owns
-	Users can search for recipes that use ingredients they own
-	Users can search for recipes by title (free text search)
-	Log out functionality
-	Users can save liked recipes to their profile
-	Profile page displays user’s saved recipes
-	Recipes can be scaled up or down by ingredient quantities
-	User can add friends
-	User can view friends saved/ created recipes

## User Stories
1.	As a cook, I want to be able to find new recipes
2.	As a cook, I want to be able to share my recipes
3.	As a cook, I want to be able to view a list of ingredients for a recipe
4.	As a recipe poster, I want to read my recipe’s reviews
5.	As a cook, I want to see an image of the completed recipe
6.	As a paranoid individual, I don’t want to be required to make an account to view recipes
7.	As a recipe poster, I want to be able to update/edit recipes
8.  As a cook, I would like to see who all has liked the recipe and what there ratings were
9.  As a cook, I would like to be able to save recipes that I like
10. As a recipe poster, I do not want people to be able to change my recipes

## Technologies Used
- Heroku for app deployment
- Sequlize for database creation and migration
- HTML, CSS, and JavaScript
- Axios to generate random recipes

## Issues and Resolutions
- We encountered an issue with updating recipe ingredients and redirecting back to our recipe show page. The tables were updating but not fast enough to display on the redirect. We were unable to resolve the issue so we redirected the user back to their profile page after editing a recipe. 
- Formatting data from random recipe api was an issues since the fromatting of the measurement data. This bug is still to be resolved.

