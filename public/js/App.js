function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Controller from "./Controller.js";
import ShoppingList from "./ui/ShoppingList.js";
import FavouriteRecipes from "./ui/FavouriteRecipes.js";
import RecipeDetails from "./ui/RecipeDetails.js";
import RecipeSearchResults from "./ui/RecipeSearchResults.js";
import Pagination from "./ui/Pagination.js";
import logger from "./util/SimpleDebug.js";
import LocationList from "./ui/LocationList.js";
import notifier from "./NotificationManager.js";

var App = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(App, _React$Component);

  function App() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.controller = new Controller(_assertThisInitialized(_this), window.localStorage);
    _this.searchInProgress = false;
    /* turn on console messages for development*/

    logger.setOn();
    logger.setLevel(200);
    logger.setMinLevel(0); // Event handlers

    _this.handleEventStartRecipeSearch = _this.handleEventStartRecipeSearch.bind(_assertThisInitialized(_this));
    _this.handleEventStartRecipeSearchKeyUp = _this.handleEventStartRecipeSearchKeyUp.bind(_assertThisInitialized(_this));
    _this.handleEventStartLocationSearch = _this.handleEventStartLocationSearch.bind(_assertThisInitialized(_this));
    _this.handleEventAddRecipeToFavourites = _this.handleEventAddRecipeToFavourites.bind(_assertThisInitialized(_this));
    _this.handleEventRemoveRecipeFromFavourites = _this.handleEventRemoveRecipeFromFavourites.bind(_assertThisInitialized(_this));
    _this.handleEventAddRecipeToShoppingList = _this.handleEventAddRecipeToShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventShowShoppingList = _this.handleEventShowShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventShowFavouriteRecipes = _this.handleEventShowFavouriteRecipes.bind(_assertThisInitialized(_this));
    _this.handleEventShowLocationList = _this.handleEventShowLocationList.bind(_assertThisInitialized(_this));
    _this.handleEventRemoveIngredientFromShoppingList = _this.handleEventRemoveIngredientFromShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventRemoveAllIngredientsFromShoppingList = _this.handleEventRemoveAllIngredientsFromShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventShowRecipeDetailsFromFavourites = _this.handleEventShowRecipeDetailsFromFavourites.bind(_assertThisInitialized(_this));
    _this.handleEventShowRecipeDetailsFromSearch = _this.handleEventShowRecipeDetailsFromSearch.bind(_assertThisInitialized(_this));
    _this.handleEventAddFavouriteRecipeToShoppingList = _this.handleEventAddFavouriteRecipeToShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventPaginationPageNumberPressed = _this.handleEventPaginationPageNumberPressed.bind(_assertThisInitialized(_this));
    _this.handleEventPaginationPreviousPressed = _this.handleEventPaginationPreviousPressed.bind(_assertThisInitialized(_this));
    _this.handleEventPaginationNextPressed = _this.handleEventPaginationNextPressed.bind(_assertThisInitialized(_this));
    _this.handleCloseModals = _this.handleCloseModals.bind(_assertThisInitialized(_this));
    _this.doNothingHandler = _this.doNothingHandler.bind(_assertThisInitialized(_this));
    _this.searchStarted = _this.searchStarted.bind(_assertThisInitialized(_this));
    _this.searchEnded = _this.searchEnded.bind(_assertThisInitialized(_this)); // favourite toggling

    _this.handleEventToggleRecipeToFromFavourites = _this.handleEventToggleRecipeToFromFavourites.bind(_assertThisInitialized(_this));
    _this.state = {
      searchResults: [],
      shoppingList: [],
      favouriteRecipes: [],
      locations: [],
      showShoppingList: false,
      showFavouriteRecipes: false,
      showRecipeDetails: false,
      showLocationDetails: false,
      selectedRecipe: null,
      selectedRecipeIsFavourite: false,
      currentPageNumber: 1,
      totalPages: 1,
      resultsPerPage: 4,
      allowNotifications: true
    };
    return _this;
  }

  var _proto = App.prototype;

  _proto.handleCloseModals = function handleCloseModals(event) {
    this.setState({
      showShoppingList: false,
      showFavouriteRecipes: false,
      showRecipeDetails: false,
      showLocations: false
    });
  };

  _proto.doNothingHandler = function doNothingHandler(event) {};

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "App"
    }, /*#__PURE__*/React.createElement("div", {
      className: "columns"
    }, /*#__PURE__*/React.createElement(ShoppingList, {
      shoppingList: this.state.shoppingList,
      deleteHandler: this.handleEventRemoveIngredientFromShoppingList,
      closeHandler: this.handleCloseModals,
      clearListHandler: this.handleEventRemoveAllIngredientsFromShoppingList,
      locationHandler: this.handleEventStartLocationSearch,
      shouldShow: this.state.showShoppingList
    }), /*#__PURE__*/React.createElement(LocationList, {
      locations: this.state.locations,
      closeHandler: this.handleCloseModals,
      shouldShow: this.state.showLocations
    }), /*#__PURE__*/React.createElement(FavouriteRecipes, {
      favouriteRecipes: this.state.favouriteRecipes,
      deleteHandler: this.handleEventRemoveRecipeFromFavourites,
      closeHandler: this.handleCloseModals,
      shouldShow: this.state.showFavouriteRecipes,
      detailsHandler: this.handleEventShowRecipeDetailsFromFavourites
    }), /*#__PURE__*/React.createElement(RecipeDetails, {
      recipe: this.state.selectedRecipe,
      closeHandler: this.handleCloseModals,
      shouldShow: this.state.showRecipeDetails,
      isFavourite: this.controller.isRecipeAlreadyAFavourite,
      favouriteHandler: this.handleEventToggleRecipeToFromFavourites,
      shoppingListHandler: this.state.selectedRecipeIsFavourite ? this.handleEventAddFavouriteRecipeToShoppingList : this.handleEventAddRecipeToShoppingList
    }), /*#__PURE__*/React.createElement(RecipeSearchResults, {
      recipes: this.state.searchResults,
      currentPageNumber: this.state.currentPageNumber,
      resultsPerPage: this.state.resultsPerPage,
      isFavourite: this.controller.isRecipeAlreadyAFavourite,
      favouriteHandler: this.handleEventToggleRecipeToFromFavourites,
      shoppingListHandler: this.handleEventAddRecipeToShoppingList,
      detailsHandler: this.handleEventShowRecipeDetailsFromSearch
    })), /*#__PURE__*/React.createElement(Pagination, {
      recipes: this.state.searchResults,
      currentPageNumber: this.state.currentPageNumber,
      totalNumberOfPages: this.state.totalPages,
      nextHandler: this.handleEventPaginationNextPressed,
      previousHandler: this.handleEventPaginationPreviousPressed,
      pageHandler: this.handleEventPaginationPageNumberPressed
    }), /*#__PURE__*/React.createElement("footer", {
      className: "footer",
      style: {
        textAlign: "center"
      }
    }, "Copyright 2021 Chop 'n' Change.  All rights reserved.", /*#__PURE__*/React.createElement("div", {
      id: "edamam-badge",
      "data-color": "transparent"
    })));
  };

  _proto.componentDidMount = function componentDidMount() {
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
  } ///
  ///
  /// Pagination
  ///
  ///
  ;

  _proto.isLastPage = function isLastPage() {
    return this.state.currentPageNumber === this.state.totalPages;
  };

  _proto.isFirstPage = function isFirstPage() {
    return this.state.currentPageNumber === 1;
  };

  _proto.handleEventPaginationNextPressed = function handleEventPaginationNextPressed(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling Pagination Next Pressed");
    if (event.target === undefined) return;

    if (!this.isLastPage()) {
      var newPageNumber = this.state.currentPageNumber + 1;
      this.setState({
        currentPageNumber: newPageNumber
      });
    }
  };

  _proto.handleEventPaginationPreviousPressed = function handleEventPaginationPreviousPressed(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling Pagination Previous Pressed");
    if (event.target === undefined) return;

    if (!this.isFirstPage()) {
      var newPageNumber = this.state.currentPageNumber - 1;
      this.setState({
        currentPageNumber: newPageNumber
      });
    }
  };

  _proto.handleEventPaginationPageNumberPressed = function handleEventPaginationPageNumberPressed(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling Pagination Page Number Pressed");
    if (event.target === undefined) return; // get the page selected from the event target

    var pageNumber = parseInt(event.target.getAttribute("page-number"));
    this.setState({
      currentPageNumber: pageNumber
    });
  } ///
  ///
  ///  EVENT HANDLERS SECTION
  ///
  ///
  ;

  _proto.searchStarted = function searchStarted() {
    document.getElementById("search-btn").classList.add("is-loading");
    this.searchInProgress = true;
  };

  _proto.searchEnded = function searchEnded() {
    document.getElementById("search-btn").classList.remove("is-loading");
    this.searchInProgress = false;
  }
  /*
  This event should collect the details from the search form (query, meal type, diet type, and allergies)
  and construct a search request to send to the controller.
  */
  ;

  _proto.handleEventStartRecipeSearchKeyUp = function handleEventStartRecipeSearchKeyUp(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      this.handleEventStartRecipeSearch(event);
    }
  };

  _proto.handleEventStartLocationSearch = function handleEventStartLocationSearch(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Start Location Search");
    this.handleCloseModals();
    this.setState({
      showLocations: true,
      locations: []
    });
    this.controller.searchForSupermarkets();
  };

  _proto.handleEventShowLocationList = function handleEventShowLocationList(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Show Location List"); // ask the controller to change the state and get the favourite recipes list

    this.setState({
      showLocations: true,
      locations: this.controller.getLocations()
    });
  };

  _proto.handleEventStartRecipeSearch = function handleEventStartRecipeSearch(event) {
    if (this.searchInProgress) return; // don't run another search if one running

    event.preventDefault();
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Start Recipe Search");
    var queryText = document.getElementById("search-text").value.trim(); // code in here to collect the information from the elements of the page

    var isBalancedDiet = document.getElementById("balanced").checked;
    var isHighFiber = false; //document.getElementById("high-fiber").checked;

    var isHighProtein = document.getElementById("high-protein").checked;
    var isLowCarb = document.getElementById("low-carb").checked;
    var isLowFat = document.getElementById("low-fat").checked;
    var isLowSodium = document.getElementById("low-sodium").checked;
    var isDiaryFree = document.getElementById("dairy-free").checked;
    var isGlutenFree = document.getElementById("gluten-free").checked;
    var isKosher = document.getElementById("kosher").checked;
    var isVegan = document.getElementById("vegan").checked;
    var isVegetarian = document.getElementById("vegetarian").checked;
    var isDiabetic = document.getElementById("sugar-conscious").checked;
    var isBreakfast = document.getElementById("breakfast").checked;
    var isLunch = document.getElementById("lunch").checked;
    var isDinner = document.getElementById("dinner").checked;
    var isSnack = document.getElementById("snack").checked;
    this.controller.searchForRecipes(queryText, isBalancedDiet, isHighFiber, isHighProtein, isLowCarb, isLowFat, isLowSodium, isDiaryFree, isGlutenFree, isKosher, isVegan, isVegetarian, isDiabetic, isBreakfast, isLunch, isDinner, isSnack); // this app will be notified when the application state changes
  };

  _proto.showNotification = function showNotification(title, message, className, timeout) {
    if (className === void 0) {
      className = "info";
    }

    if (timeout === void 0) {
      timeout = 5000;
    }

    if (!this.state.allowNotifications) return;
    notifier.show(title, message, className, timeout);
  }
  /*
  This the event handler for when the user adds a recipe to the favourites
  */
  ;

  _proto.handleEventToggleRecipeToFromFavourites = function handleEventToggleRecipeToFromFavourites(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Toggle Recipe to/from Favourites List");
    var recipeId = event.target.getAttribute("recipe-id");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Toggle Recipe to/from Favourites List with id " + recipeId); // the recipe object could be a saved favourite or from the last search or may only exist in state (after being removed from favourites)

    var recipe = this.controller.getRecipeFromLastSearchResultsById(recipeId);

    if (recipe == null) {
      // not in search results
      recipe = this.controller.getRecipeFromFavouritesById(recipeId);

      if (recipe == null) {
        //was previously in favourites and toggled out, exists in state (hopefully?)
        recipe = this.state.selectedRecipe;
      }
    } // if we couldn't find a recipe then...well exit


    if (recipe === null) return; // are we dealing with a recipe that is already a favourite?

    if (!this.controller.isRecipeAlreadyAFavourite(recipe)) {
      var wasAdded = this.controller.addRecipeToFavouriteRecipes(recipe);

      if (wasAdded) {
        this.showNotification("Favourite Recipes", "Added " + recipe.name + " to favourites.", "success");
      } else {
        this.showNotification("Favourite Recipes", "Already added " + recipe.name, "warning");
      }
    } else {
      this.controller.removeRecipeFromFavouriteRecipes(recipe);
      this.showNotification("Favourite Recipes", "Removed " + recipe.name + " from favourites.", "danger");
    }
  };

  _proto.handleEventAddRecipeToFavourites = function handleEventAddRecipeToFavourites(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Add Recipe to Favourites List");
    /*
    collect the recipe Id attribute from the event
    */

    var recipeId = event.target.getAttribute("recipe-id");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Add Recipe to Favourites List with id " + recipeId);
    var recipe = this.controller.getRecipeFromLastSearchResultsById(recipeId);
    var wasAdded = this.controller.addRecipeToFavouriteRecipes(recipe); // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)

    if (wasAdded) {
      this.showNotification("Favourite Recipes", "Added " + recipe.name + " to favourites.", "success");
    } else {
      this.showNotification("Favourite Recipes", "Already added " + recipe.name, "warning");
    }
  }
  /*
  This is the event handler for when the user removes a recipe from the favourites
  */
  ;

  _proto.handleEventRemoveRecipeFromFavourites = function handleEventRemoveRecipeFromFavourites(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Remove Recipe from Favourites List");
    var recipeId = event.target.getAttribute("recipe-id");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Removing recipes with id " + recipeId);
    var recipe = this.controller.getRecipeFromFavouritesById(recipeId);
    this.controller.removeRecipeFromFavouriteRecipesById(recipeId); // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)

    this.showNotification("Favourite Recipes", "Removed " + recipe.name + " from favourites.", "danger");
  };

  _proto.handleEventAddFavouriteRecipeToShoppingList = function handleEventAddFavouriteRecipeToShoppingList(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - add Favourite Recipe to Shopping List");
    var recipeId = event.target.getAttribute("recipe-id");
    var recipe = this.controller.getRecipeFromFavouritesById(recipeId);
    this.controller.addRecipeIngredientsToShoppingList(recipe);
    this.showNotification("Shopping List", "Added ingredients from " + recipe.name + " to shopping list.");
  }
  /*
  This is the event handler for when the user adds a recipe to the shopping list
  */
  ;

  _proto.handleEventAddRecipeToShoppingList = function handleEventAddRecipeToShoppingList(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Add Recipe to Shopping List");
    /*
    collect the recipe Id attribute from the event
    */

    var recipeId = event.target.getAttribute("recipe-id");
    var recipe = this.controller.getRecipeFromLastSearchResultsById(recipeId);
    this.controller.addRecipeIngredientsToShoppingList(recipe); // this app will be notified when the application state changes

    this.showNotification("Shopping List", "Added ingredients from " + recipe.name + " to shopping list.");
  }
  /*
  This the event handler for when the user wants to see the shopping list
  */
  ;

  _proto.handleEventShowShoppingList = function handleEventShowShoppingList(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Show Shopping List"); // ask the controller to change the state and get the shopping list

    this.setState({
      showShoppingList: true,
      shoppingList: this.controller.getShoppingList()
    });
  }
  /*
  This the event handler for when the user wants to see the favourite recipes list
  */
  ;

  _proto.handleEventShowFavouriteRecipes = function handleEventShowFavouriteRecipes(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Show Favourite Recipe List"); // ask the controller to change the state and get the favourite recipes list

    this.setState({
      showFavouriteRecipes: true,
      favouriteRecipes: this.controller.getFavouriteRecipes()
    });
  }
  /*
  This the event handler for when the user wants to see the recipe details
  */
  ;

  _proto.handleEventShowRecipeDetailsFromFavourites = function handleEventShowRecipeDetailsFromFavourites(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Show Recipe Details from Favourites");
    /*
    collect the recipe attribute from the event
    */

    var recipeId = event.target.getAttribute("recipe-id");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Show recipe with id " + recipeId);
    this.setState({
      showRecipeDetails: true,
      selectedRecipe: this.controller.getRecipeFromFavouritesById(recipeId),
      selectedRecipeIsFavourite: true
    });
  };

  _proto.handleEventShowRecipeDetailsFromSearch = function handleEventShowRecipeDetailsFromSearch(event) {
    event.preventDefault();
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Show Recipe Details from Search Results");
    /*
    collect the recipe attribute from the event
    */

    var recipeId = event.target.getAttribute("recipe-id");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Show recipe with id " + recipeId);
    this.setState({
      showRecipeDetails: true,
      selectedRecipe: this.controller.getRecipeFromLastSearchResultsById(recipeId),
      selectedRecipeIsFavourite: false
    });
  }
  /*
  This is the event handler for when the user removes an ingredient from the shopping list
  */
  ;

  _proto.handleEventRemoveIngredientFromShoppingList = function handleEventRemoveIngredientFromShoppingList(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Remove Ingredient from Shopping List");
    var ingredient = event.target.getAttribute("ingredient"); // GET FROM the document element via the event

    this.controller.removeIngredientFromShoppingList(ingredient); // this app will be notified when the application state changes
  };

  _proto.handleEventRemoveAllIngredientsFromShoppingList = function handleEventRemoveAllIngredientsFromShoppingList(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Remove All Ingredients from Shopping List");
    this.controller.removeAllIngredientsFromShoppingList(); // close the shopping list

    this.handleCloseModals(); // this app will be notified when the application state changes
  };

  _proto.handleEventToggleFilter = function handleEventToggleFilter() {
    var filtersDiv = document.getElementById("filters");

    if (filtersDiv.style.display === "none") {
      filtersDiv.style.display = "block";
    } else {
      filtersDiv.style.display = "none";
    }
  };

  _proto.handleEventClearFilters = function handleEventClearFilters() {
    var filtersDiv = document.getElementById("filters");
    var filters = filtersDiv.querySelectorAll("input");
    filters.forEach(function (filter, index) {
      filter.checked = false;
    });
  };

  return App;
}(React.Component);

var element = /*#__PURE__*/React.createElement(App, {
  className: "columns"
});
ReactDOM.render(element, document.getElementById("root"));