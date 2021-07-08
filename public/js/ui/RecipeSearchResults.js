import logger from "../util/SimpleDebug.js";

export default class RecipeSearchResults {
    constructor(document) {
        this.document = document;
    }

    render(arrayOfRecipes) {
        // clear the current results list and redraw dynamically
        logger.log("Rendering search results",10);
        logger.log(arrayOfRecipes,10);

        var displaySearchResults = function (results) {
            if (results.length === 0) {
                resultsList.textContent = "No recipes found!";
                return;
            }

            for (var i = 0; i < results; i++) {
                var recipeName = results[i].recipeName // UPDATE KEY to whatever this is
                var recipeImg = results[i].recipeImg // Update to whatever this is

                // populate recipe name
                var recipeCardTitle = document.querySelector("#results-title-" + i);
                recipeCardTitle.textContent = recipeName
                recipeCardTitle.setAttribute("href", handleEventShowRecipeDetails(recipeName));

                // populate recipe image
                var recipeCardImg = document.querySelector("#results-img-" + i);
                recipeCardImg.src = recipeImg;
                recipeCardImg.setAttribute("href", handleEventShowRecipeDetails(recipeName));                
            }
        
            
        }

    }
}