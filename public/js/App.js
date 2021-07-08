import logger from './util/SimpleDebug.js'
import Controller from "./Controller.js";
import ShoppingList from "./ui/ShoppingList.js";
import FavouriteRecipes from "./ui/FavouriteRecipes.js";
import RecipeSearchResults from "./ui/RecipeSearchResults.js";
import RecipeDetails from "./ui/RecipeDetails.js";
import ModalHandler from "./util/ui/ModalHandler.js";

class App {
    constructor() {
        this.controller = new Controller(this, window.localStorage);
        this.modalHandler = new ModalHandler(document,"is-active");
        this.shoppingListView = new ShoppingList(this,document,this.modalHandler);
        this.favouriteRecipesView = new FavouriteRecipes(this,document,this.modalHandler);
        this.searchResultsView = new RecipeSearchResults(document);
        this.recipeDetailsView = new RecipeDetails(this,document,this.modalHandler);

        // state change handlers (called when the data changes in the application)
        this.handleFavouriteRecipesChange = this.handleFavouriteRecipesChange.bind(this);
        this.handleRecipeSearchResultsChange = this.handleRecipeSearchResultsChange.bind(this);
        this.handleShoppingListChange = this.handleShoppingListChange.bind(this);

        // Event handlers
        this.handleEventStartRecipeSearch = this.handleEventStartRecipeSearch.bind(this);
        this.handleEventAddRecipeToFavourites = this.handleEventAddRecipeToFavourites.bind(this);
        this.handleEventRemoveRecipeFromFavourites = this.handleEventRemoveRecipeFromFavourites.bind(this);
        this.handleEventAddRecipeToShoppingList = this.handleEventAddRecipeToShoppingList.bind(this);
        this.handleEventShowShoppingList = this.handleEventShowShoppingList.bind(this);
        this.handleEventShowFavouriteRecipes = this.handleEventShowFavouriteRecipes.bind(this);
        this.handleEventRemoveIngredientFromShoppingList = this.handleEventRemoveIngredientFromShoppingList.bind(this);
        this.handleEventShowRecipeDetails = this.handleEventShowRecipeDetails.bind(this);


        this.controller.initialise();
    }

    ///
    ///
    ///  STATE CHANGE HANDLERS SECTION
    ///
    ///


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
        logger.log("Handling recipes change for display", 1);
        logger.log(recipes, 100);
        this.searchResultsView.render(recipes);
    }

    /*  This method is called from the Controller when favourite recipes are loaded or changed */
    handleFavouriteRecipesChange(arrayOfFavouriteRecipes) {
        logger.log("Handling favourite recipes change for display", 1);
        logger.log(arrayOfFavouriteRecipes);
        this.favouriteRecipesView.render(arrayOfFavouriteRecipes);
    }

    /*  This method is called from the Controller when the shopping list is loaded or changed */
    handleShoppingListChange(arrayOfIngredientStrings) {
        logger.log("Handling shopping list change for display", 1);
        logger.log(arrayOfIngredientStrings);
        this.shoppingListView.render(arrayOfIngredientStrings);
    }

    ///
    ///
    ///  EVENT HANDLERS SECTION
    ///
    ///


    /*
    This event should collect the details from the search form (query, meal type, diet type, and allergies)
    and construct a search request to send to the controller.
     */
    handleEventStartRecipeSearch(event) {
        /*
          TO-DO
          1.  Get the search parameters from the form
         */
        logger.log("Handling event - Start Recipe Search",1);

        // code in here to collect the information from the elements of the page

        let queryText = "";
        let isBalancedDiet = false;
        let isHighFiber = false;
        let isHighProtein = false;
        let isLowCarb = false;
        let isLowFat = false;
        let isLowSodium = false;
        let isDiaryFree = false;
        let isGlutenFree = false;
        let isKosher = false;
        let isVegan = false;
        let isVegetarian = false;
        let isDiabetic = false;
        let isBreakfast = false;
        let isLunch = false;
        let isDinner = false;
        let isSnack = false;
        this.controller.searchForRecipes(
            queryText,
            isBalancedDiet,
            isHighFiber,
            isHighProtein,
            isLowCarb,
            isLowFat,
            isLowSodium,
            isDiaryFree,
            isGlutenFree,
            isKosher,
            isVegan,
            isVegetarian,
            isDiabetic,
            isBreakfast,
            isLunch,
            isDinner,
            isSnack
        );
        // this app will be notified when the application state changes and will see a call to handleRecipeSearchResultsChange (ABOVE)

    }

    /*
    This the event handler for when the user adds a recipe to the favourites
     */
    handleEventAddRecipeToFavourites(event) {
        logger.log("Handling event - Add Recipe to Favourites List",1);
        /*
        collect the recipe Id attribute from the event
         */

        let recipeId = ""; //TO-DO get from document element


        this.controller.addRecipeToFavouriteRecipes(this.controller.getRecipeFromLastSearchResultsById(recipeId));
        // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
    }

    /*
      This is the event handler for when the user removes a recipe from the favourites
    */
    handleEventRemoveRecipeFromFavourites(event) {
        logger.log("Handling event - Remove Recipe from Favourites List",1);
        let recipeId = event.target.getAttribute("recipe-id");
        logger.log("Removing recipes with id " + recipeId,1);

        this.controller.removeRecipeFromFavouriteRecipesById(recipeId);
        // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
    }

    /*
      This is the event handler for when the user adds a recipe to the shopping list
    */
    handleEventAddRecipeToShoppingList(event) {
        logger.log("Handling event - Add Recipe to Shopping List",1);
        /*
        collect the recipe Id attribute from the event
         */

        let recipeId = ""; // TO-DO get from document element


        this.controller.addRecipeIngredientsToShoppingList(this.controller.getRecipeFromLastSearchResultsById(recipeId));
        // this app will be notified when the application state changes and will see a call to handleShoppingListChange (ABOVE)
    }

    /*
     This the event handler for when the user wants to see the shopping list
      */
    handleEventShowShoppingList(event) {
        logger.log("Handling event - Show Shopping List",1);
        // ask the controller to change the state and get the favourite recipes list
        this.controller.getShoppingList();
        // this app will be notified when the application state changes and will see a call to handleShoppingListChange (ABOVE)
        this.shoppingListView.show();
    }

    /*
     This the event handler for when the user wants to see the favourite recipes list
      */
    handleEventShowFavouriteRecipes(event) {
        logger.log("Handling event - Show Favourite Recipe List",1);
        // ask the controller to change the state and get the favourite recipes list
        this.controller.getFavouriteRecipes();
        // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
        this.favouriteRecipesView.show();
    }

    /*
    This the event handler for when the user wants to see the recipe details
     */
    handleEventShowRecipeDetails(event) {
        logger.log("Handling event - Show Recipe Details",1);
        /*
        collect the recipe Id attribute from the event
         */

        let recipeId = event.target.getAttribute("recipe-id");
        logger.log("Removing recipes with id " + recipeId,1);
        let recipeDetails = this.controller.getRecipeFromLastSearchResultsById(recipeId);

        // TO-DO show the modal and display the details
        this.recipeDetailsView.render(recipeDetails);
        this.recipeDetailsView.show();
    }

    /*
      This is the event handler for when the user removes an ingredient from the shopping list
    */
    handleEventRemoveIngredientFromShoppingList(event) {
        logger.log("Handling event - Remove Ingredient from Shopping List",1);
        let ingredient = event.target.innerText; // GET FROM the document element via the event

        this.controller.removeIngredientFromShoppingList(ingredient);
        // this app will be notified when the application state changes and will see a call to handleShoppingListChange (ABOVE)
    }
}

/* turn on console messages for development*/
logger.setOn();
logger.setLevel(1000);

let app = new App();

var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var searchRefineEl = document.querySelector("#search-refine"); // the dropdown element to refine the search
var favBtn = document.querySelector("#favourite-btn"); // the button to open the favourites modal
var shoppingListBtn = document.querySelector("#shopping-list-btn"); // the button to open the shopping list modal
var supermarketButton = document.querySelector("#supermarket-btn"); // the button to open the supermarket map feature, may not need this
var resultsList = document.querySelector("#results-list"); // the container that we will append our search results elements to
var recipeDetail = document.querySelector("#recipe-detail"); // the modal window for recipe detail


searchBtn.addEventListener("click",app.handleEventStartRecipeSearch);

shoppingListBtn.addEventListener("click",app.handleEventShowShoppingList);

favBtn.addEventListener("click",app.handleEventShowFavouriteRecipes);
