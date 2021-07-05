import logger from './util/SimpleDebug.js'
import Controller from "./Controller.js";
import ShoppingList from "./ui/ShoppingList.js";
import FavouriteRecipes from "./ui/FavouriteRecipes.js";
import RecipeSearchResults from "./ui/RecipeSearchResults.js";

class App {
    constructor() {
        this.controller = new Controller(this,window.localStorage);
        this.shoppingListView = new ShoppingList(document);
        this.favouriteRecipesView = new FavouriteRecipes(document);
        this.searchResultsView = new RecipeSearchResults(document);
    }

    /*  This method is called from the Controller when recipe search results have returned */
    handleRecipeSearchResultsChange(recipes) {
        /*
           recipes is an array of objects that contain the following information:
           id  - EDAMAM id - will be needed for a new call
           name,
           imageURL,
           calories,
           ingredients - an array of strings
           mealType - string [Breakfast|Dinner|etc]
           diet - string [Balanced|Gluten-free|etc]

           if the array is empty (length 0) then there are no matching recipes or there was a web error (can't get data)
        */
        // TO-DO display the recipes on the user interface
        logger.log("Handling recipes change for display",1);
        logger.log(recipes,100);
        this.searchResultsView.render(recipes);
    }

    handleFavouriteRecipesChange(arrayOfFavouriteRecipes) {
        logger.log("Handling favourite recipes change for display",1);
        logger.log(arrayOfFavouriteRecipes);
        this.favouriteRecipesView.render(arrayOfFavouriteRecipes);
    }

    handleShoppingListChange(arrayOfIngredientStrings) {
        logger.log("Handling shopping list change for display",1);
        logger.log(arrayOfIngredientStrings);
        this.shoppingListView.render(arrayOfIngredientStrings);
    }
}
/* turn on console messages for development*/
logger.setOn();
logger.setLevel(200);

let app = new App();
app.controller.searchForRecipes();




// get relevant elements from page for use
var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var searchRefineEl = document.querySelector("#search-refine"); // the dropdown element to refine the search
var favBtn = document.querySelector("#favourite-btn"); // the button to open the favourites modal
var shoppingListBtn = document.querySelector("#shopping-list-btn"); // the button to open the shopping list modal
var supermarketButton = document.querySelector("#supermarket-btn"); // the button to open the supermarket map feature, may not need this
var resultsList = document.querySelector("#results-list"); // the container that we will append our search results elements to
var recipeDetail = document.querySelector("#recipe-detail"); // the modal window for recipe detail

