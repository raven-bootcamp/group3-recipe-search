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
        this.searchResultsView = new RecipeSearchResults(this,document,this.modalHandler);
        this.recipeDetailsView = new RecipeDetails(this,document,this.modalHandler);

        this.paginationDiv = document.getElementById("search-results-nav");

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
        this.handleEventShowRecipeDetailsFromFavourites = this.handleEventShowRecipeDetailsFromFavourites.bind(this);
        this.handleEventShowRecipeDetailsFromSearch = this.handleEventShowRecipeDetailsFromSearch.bind(this);
        this.handleEventAddFavouriteRecipeToShoppingList = this.handleEventAddFavouriteRecipeToShoppingList.bind(this);
        this.handleEventPaginationPageNumberPressed = this.handleEventPaginationPageNumberPressed.bind(this);
        this.handleEventPaginationPreviousPressed = this.handleEventPaginationPreviousPressed.bind(this);
        this.handleEventPaginationNextPressed = this.handleEventPaginationNextPressed.bind(this);


        this.currentPageNumber = 1;
        this.resultsPerPage = 4;
        this.numberOfPages = 5;
        this.paginationDiv.classList.add("is-hidden");

        this.controller.initialise();
    }

    ////
    ////
    ////  Pagination
    ////
    ////
    getCurrentPageNumber() {
        return this.currentPageNumber;
    }

    getResultsPerPage() {
        return this.resultsPerPage;
    }

    setCurrentPageNumber(currentPageNumber) {
        this.currentPageNumber = currentPageNumber;
    }

    isFirstPage() {
        return (this.currentPageNumber === 1);
    }

    isLastPage() {
        return (this.currentPageNumber === 5)
    }

    getTotalPageNumber() {
        return this.numberOfPages;
    }

    setTotalPages(totalPages) {
        this.numberOfPages = totalPages;
    }

    increasePageNumber() {
        if (!this.isLastPage()) {
            this.currentPageNumber++;
        }
    }

    decreasePageNumber() {
        if (!this.isFirstPage()) {
            this.currentPageNumber--;
        }
    }

    handleEventPaginationNextPressed(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling Pagination Next Pressed");
        if (event.target === undefined) return;
        if (!this.isLastPage()) {
            // unset the is-current the current page
            document.getElementById("page-" + this.getCurrentPageNumber()).classList.remove("is-current");
            // set the next page to current
            this.increasePageNumber();
            document.getElementById("page-" + this.getCurrentPageNumber()).classList.add("is-current");
            // are we on the last page
            if (this.isLastPage()) {
                // disable the next button
                document.getElementById("search-results-next").disabled = true;
            }
            else {
                // enable the next button
                document.getElementById("search-results-next").disabled = false;
            }
            // enable the previous button
            document.getElementById("search-results-previous").disabled = false;
            // ask the results search view to re-render
            this.searchResultsView.render(this.controller.getPreviousSearch(false)); // don't fire a state change
        }
    }

    handleEventPaginationPreviousPressed(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling Pagination Previous Pressed");
        if (event.target === undefined) return;
        if (!this.isFirstPage()) {
            // unset the is-current the current page
            document.getElementById("page-" + this.getCurrentPageNumber()).classList.remove("is-current");
            // set the next page to current
            this.decreasePageNumber();
            document.getElementById("page-" + this.getCurrentPageNumber()).classList.add("is-current");
            if (this.isFirstPage()) {
                // disable the next button
                document.getElementById("search-results-previous").disabled = true;
            }
            else {
                // enable the next button
                document.getElementById("search-results-previous").disabled = false;
            }
            // enable the previous button
            document.getElementById("search-results-next").disabled = false;
            // ask the results search view to re-render
            this.searchResultsView.render(this.controller.getPreviousSearch(false)); // don't fire a state change
        }
    }

    handleEventPaginationPageNumberPressed(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling Pagination Page Number Pressed");
        if (event.target === undefined) return;
        // get the page selected from the event target
        let pageNumber = event.target.getAttribute("page-number");
        // unselect all pages
        for (let index = 1;index <= this.getTotalPageNumber();index++) {
            document.getElementById("page-" + index).classList.remove("is-current");
        }
        this.setCurrentPageNumber(pageNumber);
        // select the current page
        document.getElementById("page-" + this.getCurrentPageNumber()).classList.add("is-current");
        // check for the next and previous button changes
        if (this.isFirstPage()) {
            // disable the next button
            document.getElementById("search-results-previous").disabled = true;
        }
        else {
            // enable the next button
            document.getElementById("search-results-previous").disabled = false;
        }
        if (this.isLastPage()) {
            // disable the next button
            document.getElementById("search-results-next").disabled = true;
        }
        else {
            // enable the next button
            document.getElementById("search-results-next").disabled = false;
        }
        // ask the results search view to re-render
        this.searchResultsView.render(this.controller.getPreviousSearch(false)); // don't fire a state change
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
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling recipes change for display");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(recipes);

        this.setCurrentPageNumber(1);
        if (recipes.length > 0) {
            // show the pagination
            this.paginationDiv.classList.remove("is-hidden");
            // how many pages are there?
            let numberOfPages = Math.ceil(recipes.length/this.getResultsPerPage());
            if (numberOfPages < 5) {
                for (let index = 5;index > numberOfPages;index--) {
                    document.getElementById("page-" + this.getCurrentPageNumber()).classList.add("is-hidden");
                }
                this.setTotalPages(numberOfPages);
            }
            else {
                this.setTotalPages(5);
                for (let index = 1;index <= this.getTotalPageNumber();index++) {
                    document.getElementById("page-" + index).classList.remove("is-hidden");
                }
            }
        }
        else {
            // hide the pagination
            this.paginationDiv.classList.add("is-hidden");
        }
        this.searchResultsView.render(recipes);
    }

    /*  This method is called from the Controller when favourite recipes are loaded or changed */
    handleFavouriteRecipesChange(arrayOfFavouriteRecipes) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling favourite recipes change for display");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(arrayOfFavouriteRecipes);
        this.favouriteRecipesView.render(arrayOfFavouriteRecipes);
    }

    /*  This method is called from the Controller when the shopping list is loaded or changed */
    handleShoppingListChange(arrayOfIngredientStrings) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling shopping list change for display");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(arrayOfIngredientStrings);
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
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            event.preventDefault();

            if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Start Recipe Search");
            let queryText = event.target.value.trim();

            // code in here to collect the information from the elements of the page
            let isBalancedDiet = document.getElementById("balanced").checked;
            let isHighFiber = document.getElementById("high-fiber").checked;
            let isHighProtein = document.getElementById("high-protein").checked;
            let isLowCarb = document.getElementById("low-carb").checked;
            let isLowFat = document.getElementById("low-fat").checked;
            let isLowSodium = document.getElementById("low-sodium").checked;
            let isDiaryFree = document.getElementById("dairy-free").checked;
            let isGlutenFree = document.getElementById("gluten-free").checked;
            let isKosher = document.getElementById("kosher").checked;
            let isVegan = document.getElementById("vegan").checked;
            let isVegetarian = document.getElementById("vegetarian").checked;
            let isDiabetic = document.getElementById("sugar-conscious").checked;
            let isBreakfast = document.getElementById("breakfast").checked;
            let isLunch = document.getElementById("lunch").checked;
            let isDinner = document.getElementById("dinner").checked;
            let isSnack = document.getElementById("snack").checked;
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
        }
        // this app will be notified when the application state changes and will see a call to handleRecipeSearchResultsChange (ABOVE)

    }

    /*
    This the event handler for when the user adds a recipe to the favourites
     */
    handleEventAddRecipeToFavourites(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Add Recipe to Favourites List");
        /*
        collect the recipe Id attribute from the event
         */

        let recipeId = event.target.getAttribute("recipe-id");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Add Recipe to Favourites List with id " + recipeId);

        this.controller.addRecipeToFavouriteRecipes(this.controller.getRecipeFromLastSearchResultsById(recipeId));
        // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
    }

    /*
      This is the event handler for when the user removes a recipe from the favourites
    */
    handleEventRemoveRecipeFromFavourites(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Remove Recipe from Favourites List");
        let recipeId = event.target.getAttribute("recipe-id");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Removing recipes with id " + recipeId);

        this.controller.removeRecipeFromFavouriteRecipesById(recipeId);
        // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
    }

    handleEventAddFavouriteRecipeToShoppingList(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - add Favourite Recipe to Shopping List");
        let recipeId = event.target.getAttribute("recipe-id");
        this.controller.addRecipeIngredientsToShoppingList(this.controller.getRecipeFromFavouritesById(recipeId));
    }
    /*
      This is the event handler for when the user adds a recipe to the shopping list
    */
    handleEventAddRecipeToShoppingList(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Add Recipe to Shopping List");
        /*
        collect the recipe Id attribute from the event
         */

        let recipeId = event.target.getAttribute("recipe-id");


        this.controller.addRecipeIngredientsToShoppingList(this.controller.getRecipeFromLastSearchResultsById(recipeId));
        // this app will be notified when the application state changes and will see a call to handleShoppingListChange (ABOVE)
    }

    /*
     This the event handler for when the user wants to see the shopping list
      */
    handleEventShowShoppingList(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Show Shopping List");
        // ask the controller to change the state and get the favourite recipes list
        this.controller.getShoppingList();
        // this app will be notified when the application state changes and will see a call to handleShoppingListChange (ABOVE)
        this.shoppingListView.show();
    }

    /*
     This the event handler for when the user wants to see the favourite recipes list
      */
    handleEventShowFavouriteRecipes(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Show Favourite Recipe List");
        // ask the controller to change the state and get the favourite recipes list
        this.controller.getFavouriteRecipes();
        // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
        this.favouriteRecipesView.show();
    }

    /*
    This the event handler for when the user wants to see the recipe details
     */
    handleEventShowRecipeDetailsFromFavourites(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Show Recipe Details from Favourites");
        /*
        collect the recipe attribute from the event
         */

        let recipeId = event.target.getAttribute("recipe-id");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Show recipe with id " + recipeId);
        let recipe = this.controller.getRecipeFromFavouritesById(recipeId);

        this.modalHandler.__closeAllModals();
        this.recipeDetailsView.render(recipe,true);
        this.recipeDetailsView.show();
    }

    handleEventShowRecipeDetailsFromSearch(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Show Recipe Details from Search Results");
        /*
        collect the recipe attribute from the event
         */

        let recipeId = event.target.getAttribute("recipe-id");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Show recipe with id " + recipeId);


        // TO-DO show the modal and display the details
        this.modalHandler.__closeAllModals();
        this.recipeDetailsView.render(this.controller.getRecipeFromLastSearchResultsById(recipeId));
        this.recipeDetailsView.show();
    }

    /*
      This is the event handler for when the user removes an ingredient from the shopping list
    */
    handleEventRemoveIngredientFromShoppingList(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Remove Ingredient from Shopping List");
        let ingredient = event.target.getAttribute("ingredient"); // GET FROM the document element via the event

        this.controller.removeIngredientFromShoppingList(ingredient);
        // this app will be notified when the application state changes and will see a call to handleShoppingListChange (ABOVE)
    }

    handleEventToggleFilter() {
        let filtersDiv = document.getElementById("filters");

        if (filtersDiv.style.display === "none") {
            filtersDiv.style.display = "block";
        }
        else {
            filtersDiv.style.display = "none";
        }
    }
}

/* turn on console messages for development*/
logger.setOn();
logger.setLevel(200);
logger.setMinLevel(0);

let app = new App();

var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var searchRefineEl = document.querySelector("#search-refine"); // the dropdown element to refine the search
var favBtn = document.querySelector("#favourite-btn"); // the button to open the favourites modal
var shoppingListBtn = document.querySelector("#shopping-list-btn"); // the button to open the shopping list modal
var supermarketButton = document.querySelector("#supermarket-btn"); // the button to open the supermarket map feature, may not need this
var resultsList = document.querySelector("#search_results"); // the container that we will append our search results elements to
var recipeDetail = document.querySelector("#recipe-detail"); // the modal window for recipe detail


searchBtn.addEventListener("keyup",app.handleEventStartRecipeSearch);

shoppingListBtn.addEventListener("click",app.handleEventShowShoppingList);

favBtn.addEventListener("click",app.handleEventShowFavouriteRecipes);
document.getElementById("filter-button").addEventListener("click",app.handleEventToggleFilter);
document.getElementById("search-results-previous").addEventListener("click",app.handleEventPaginationPreviousPressed);
document.getElementById("search-results-next").addEventListener("click",app.handleEventPaginationNextPressed);
document.getElementById("page-1").addEventListener("click",app.handleEventPaginationPageNumberPressed);
document.getElementById("page-2").addEventListener("click",app.handleEventPaginationPageNumberPressed);
document.getElementById("page-3").addEventListener("click",app.handleEventPaginationPageNumberPressed);
document.getElementById("page-4").addEventListener("click",app.handleEventPaginationPageNumberPressed);
document.getElementById("page-5").addEventListener("click",app.handleEventPaginationPageNumberPressed);


