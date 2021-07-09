import Controller from "./Controller.js";
import ShoppingList from "./ui/ShoppingList.js";
import FavouriteRecipes from "./ui/FavouriteRecipes.js";
import RecipeDetails from "./ui/RecipeDetails.js";
import RecipeSearchResults from "./ui/RecipeSearchResults.js";
import Pagination from "./ui/Pagination.js";
import logger from "./util/SimpleDebug.js";

class App extends React.Component {
    constructor() {
        super();
        this.controller = new Controller(this, window.localStorage);
        this.searchInProgress = false;

        /* turn on console messages for development*/
        logger.setOn();
        logger.setLevel(200);
        logger.setMinLevel(0);

        // Event handlers
        this.handleEventStartRecipeSearch = this.handleEventStartRecipeSearch.bind(this);
        this.handleEventStartRecipeSearchKeyUp = this.handleEventStartRecipeSearchKeyUp.bind(this);
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

        this.handleCloseModals = this.handleCloseModals.bind(this);
        this.doNothingHandler = this.doNothingHandler.bind(this);

        this.searchStarted = this.searchStarted.bind(this);
        this.searchEnded = this.searchEnded.bind(this);

        this.state = {
            searchResults: [],
            shoppingList: [],
            favouriteRecipes: [],
            showShoppingList: false,
            showFavouriteRecipes: false,
            showRecipeDetails: false,
            selectedRecipe: null,
            selectedRecipeIsFavourite: false,
            currentPageNumber: 1,
            totalPages: 1,
            resultsPerPage: 5
        };

    }

    handleCloseModals(event) {
        this.setState({showShoppingList: false, showFavouriteRecipes: false, showRecipeDetails: false});
    }

    doNothingHandler(event) {
    }


    render() {
        return (
            <div id="App">
                <div className={"columns"}>
                    <ShoppingList shoppingList={this.state.shoppingList}
                                  deleteHandler={this.handleEventRemoveIngredientFromShoppingList}
                                  closeHandler={this.handleCloseModals}
                                  shouldShow={this.state.showShoppingList}/>
                    <FavouriteRecipes favouriteRecipes={this.state.favouriteRecipes}
                                      deleteHandler={this.handleEventRemoveRecipeFromFavourites}
                                      closeHandler={this.handleCloseModals}
                                      shouldShow={this.state.showFavouriteRecipes}
                                      detailsHandler={this.handleEventShowRecipeDetailsFromFavourites}/>
                    <RecipeDetails recipe={this.state.selectedRecipe}
                                   closeHandler={this.handleCloseModals}
                                   shouldShow={this.state.showRecipeDetails}
                                   favouriteHandler={this.state.selectedRecipeIsFavourite ? this.doNothingHandler : this.handleEventAddRecipeToFavourites}
                                   shoppingListHandler={this.state.selectedRecipeIsFavourite ? this.handleEventAddFavouriteRecipeToShoppingList : this.handleEventAddRecipeToShoppingList}/>
                    <RecipeSearchResults recipes={this.state.searchResults}
                                         currentPageNumber={this.state.currentPageNumber}
                                         resultsPerPage={4}
                                         favouriteHandler={this.handleEventAddRecipeToFavourites}
                                         shoppingListHanlder={this.handleEventAddRecipeToShoppingList}
                                         detailsHandler={this.handleEventShowRecipeDetailsFromSearch}/>
                </div>
                <Pagination recipes={this.state.searchResults}
                            currentPageNumber={this.state.currentPageNumber}
                            totalNumberOfPages={this.state.totalPages}
                            nextHandler={this.handleEventPaginationNextPressed}
                            previousHandler={this.handleEventPaginationPreviousPressed}
                            pageHandler={this.handleEventPaginationPageNumberPressed}/>

                <footer className="footer" style={{textAlign: "center"}}>Chop 'n' Change</footer>
            </div>
        );
    }

    componentDidMount() {
        document.getElementById("search-btn").addEventListener("click", this.handleEventStartRecipeSearch);
        document.getElementById("search-text").addEventListener("keyup", this.handleEventStartRecipeSearchKeyUp);
        document.getElementById("shopping-list-btn").addEventListener("click", this.handleEventShowShoppingList);
        document.getElementById("favourite-btn").addEventListener("click", this.handleEventShowFavouriteRecipes);
        document.getElementById("filter-button").addEventListener("click", this.handleEventToggleFilter);
        document.getElementById("filter-reset").addEventListener("click", this.handleEventClearFilters);
        this.setState({
            searchResults: this.controller.getPreviousSearch(),
            shoppingList: this.controller.getShoppingList(),
            favouriteRecipes: this.controller.getFavouriteRecipes()
        });
    }

    ///
    ///
    /// Pagination
    ///
    ///

    isLastPage() {
        return (this.state.currentPageNumber === this.state.totalPages);
    }

    isFirstPage() {
        return (this.state.currentPageNumber === 1);
    }

    handleEventPaginationNextPressed(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling Pagination Next Pressed");
        if (event.target === undefined) return;
        if (!this.isLastPage()) {
            let newPageNumber = this.state.currentPageNumber + 1;
            this.setState({currentPageNumber: newPageNumber});
        }
    }

    handleEventPaginationPreviousPressed(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling Pagination Previous Pressed");
        if (event.target === undefined) return;
        if (!this.isFirstPage()) {
            let newPageNumber = this.state.currentPageNumber - 1;
            this.setState({currentPageNumber: newPageNumber});
        }
    }

    handleEventPaginationPageNumberPressed(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling Pagination Page Number Pressed");
        if (event.target === undefined) return;
        // get the page selected from the event target
        let pageNumber = parseInt(event.target.getAttribute("page-number"));
        this.setState({currentPageNumber: pageNumber});
    }


    ///
    ///
    ///  EVENT HANDLERS SECTION
    ///
    ///

    searchStarted() {
        document.getElementById("search-btn").classList.add("is-loading");
        this.searchInProgress = true;
    }

    searchEnded() {
        document.getElementById("search-btn").classList.remove("is-loading");
        this.searchInProgress = false;
    }

    /*
    This event should collect the details from the search form (query, meal type, diet type, and allergies)
    and construct a search request to send to the controller.
    */
    handleEventStartRecipeSearchKeyUp(event) {

        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            this.handleEventStartRecipeSearch(event);
        }
    }

    handleEventStartRecipeSearch(event) {
        if (this.searchInProgress) return; // don't run another search if one running

        event.preventDefault();

        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Start Recipe Search");
        let queryText = document.getElementById("search-text").value.trim();

        // code in here to collect the information from the elements of the page
        let isBalancedDiet = document.getElementById("balanced").checked;
        let isHighFiber = false;//document.getElementById("high-fiber").checked;
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

        // this app will be notified when the application state changes

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
        // this app will be notified when the application state changes
    }

    /*
    This the event handler for when the user wants to see the shopping list
    */
    handleEventShowShoppingList(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Show Shopping List");
        // ask the controller to change the state and get the shopping list
        this.setState({showShoppingList: true, shoppingList: this.controller.getShoppingList()});
    }

    /*
    This the event handler for when the user wants to see the favourite recipes list
    */
    handleEventShowFavouriteRecipes(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Show Favourite Recipe List");
        // ask the controller to change the state and get the favourite recipes list
        this.setState({showFavouriteRecipes: true, favouriteRecipes: this.controller.getFavouriteRecipes()});
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
        this.setState({
            showRecipeDetails: true,
            selectedRecipe: this.controller.getRecipeFromFavouritesById(recipeId),
            selectedRecipeIsFavourite: true
        });
    }

    handleEventShowRecipeDetailsFromSearch(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Show Recipe Details from Search Results");
        /*
        collect the recipe attribute from the event
        */

        let recipeId = event.target.getAttribute("recipe-id");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Show recipe with id " + recipeId);

        this.setState({
            showRecipeDetails: true,
            selectedRecipe: this.controller.getRecipeFromLastSearchResultsById(recipeId),
            selectedRecipeIsFavourite: false
        });

    }

    /*
    This is the event handler for when the user removes an ingredient from the shopping list
    */
    handleEventRemoveIngredientFromShoppingList(event) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Handling event - Remove Ingredient from Shopping List");
        let ingredient = event.target.getAttribute("ingredient"); // GET FROM the document element via the event

        this.controller.removeIngredientFromShoppingList(ingredient);
        // this app will be notified when the application state changes
    }

    handleEventToggleFilter() {
        let filtersDiv = document.getElementById("filters");

        if (filtersDiv.style.display === "none") {
            filtersDiv.style.display = "block";
        } else {
            filtersDiv.style.display = "none";
        }
    }

    handleEventClearFilters() {
        let filtersDiv = document.getElementById("filters");
        let filters = filtersDiv.querySelectorAll("input");
        filters.forEach((filter,index) => {
           filter.checked = false;
        });
    }
}

const element = <App className={"columns"}/>

ReactDOM.render(element, document.getElementById("root"));
