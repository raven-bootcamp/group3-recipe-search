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
                var recipeName = results[i].recipeName // UPDATE KEY

                var recipeCard = document.createElement("div");
                recipeCard.classList = "card";

                var recipeCardTitle = document.createElement("p");
                recipeCardTitle.classList = "card-header-title is-size-4";
                
                var 

            }
        
            
        }

    }
}