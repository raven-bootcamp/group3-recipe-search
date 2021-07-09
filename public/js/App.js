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
    _this.handleEventAddRecipeToFavourites = _this.handleEventAddRecipeToFavourites.bind(_assertThisInitialized(_this));
    _this.handleEventRemoveRecipeFromFavourites = _this.handleEventRemoveRecipeFromFavourites.bind(_assertThisInitialized(_this));
    _this.handleEventAddRecipeToShoppingList = _this.handleEventAddRecipeToShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventShowShoppingList = _this.handleEventShowShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventShowFavouriteRecipes = _this.handleEventShowFavouriteRecipes.bind(_assertThisInitialized(_this));
    _this.handleEventRemoveIngredientFromShoppingList = _this.handleEventRemoveIngredientFromShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventShowRecipeDetailsFromFavourites = _this.handleEventShowRecipeDetailsFromFavourites.bind(_assertThisInitialized(_this));
    _this.handleEventShowRecipeDetailsFromSearch = _this.handleEventShowRecipeDetailsFromSearch.bind(_assertThisInitialized(_this));
    _this.handleEventAddFavouriteRecipeToShoppingList = _this.handleEventAddFavouriteRecipeToShoppingList.bind(_assertThisInitialized(_this));
    _this.handleEventPaginationPageNumberPressed = _this.handleEventPaginationPageNumberPressed.bind(_assertThisInitialized(_this));
    _this.handleEventPaginationPreviousPressed = _this.handleEventPaginationPreviousPressed.bind(_assertThisInitialized(_this));
    _this.handleEventPaginationNextPressed = _this.handleEventPaginationNextPressed.bind(_assertThisInitialized(_this));
    _this.handleCloseModals = _this.handleCloseModals.bind(_assertThisInitialized(_this));
    _this.doNothingHandler = _this.doNothingHandler.bind(_assertThisInitialized(_this));
    _this.searchStarted = _this.searchStarted.bind(_assertThisInitialized(_this));
    _this.searchEnded = _this.searchEnded.bind(_assertThisInitialized(_this));
    _this.state = {
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
    return _this;
  }

  var _proto = App.prototype;

  _proto.handleCloseModals = function handleCloseModals(event) {
    this.setState({
      showShoppingList: false,
      showFavouriteRecipes: false,
      showRecipeDetails: false
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
      shouldShow: this.state.showShoppingList
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
      favouriteHandler: this.state.selectedRecipeIsFavourite ? this.doNothingHandler : this.handleEventAddRecipeToFavourites,
      shoppingListHandler: this.state.selectedRecipeIsFavourite ? this.handleEventAddFavouriteRecipeToShoppingList : this.handleEventAddRecipeToShoppingList
    }), /*#__PURE__*/React.createElement(RecipeSearchResults, {
      recipes: this.state.searchResults,
      currentPageNumber: this.state.currentPageNumber,
      resultsPerPage: 4,
      favouriteHandler: this.handleEventAddRecipeToFavourites,
      shoppingListHanlder: this.handleEventAddRecipeToShoppingList,
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
    }, "Chop 'n' Change"));
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
  }
  /*
  This the event handler for when the user adds a recipe to the favourites
  */
  ;

  _proto.handleEventAddRecipeToFavourites = function handleEventAddRecipeToFavourites(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Add Recipe to Favourites List");
    /*
    collect the recipe Id attribute from the event
    */

    var recipeId = event.target.getAttribute("recipe-id");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Add Recipe to Favourites List with id " + recipeId);
    this.controller.addRecipeToFavouriteRecipes(this.controller.getRecipeFromLastSearchResultsById(recipeId)); // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
  }
  /*
  This is the event handler for when the user removes a recipe from the favourites
  */
  ;

  _proto.handleEventRemoveRecipeFromFavourites = function handleEventRemoveRecipeFromFavourites(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - Remove Recipe from Favourites List");
    var recipeId = event.target.getAttribute("recipe-id");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Removing recipes with id " + recipeId);
    this.controller.removeRecipeFromFavouriteRecipesById(recipeId); // this app will be notified when the application state changes and will see a call to handleFavouriteRecipesChange (ABOVE)
  };

  _proto.handleEventAddFavouriteRecipeToShoppingList = function handleEventAddFavouriteRecipeToShoppingList(event) {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Handling event - add Favourite Recipe to Shopping List");
    var recipeId = event.target.getAttribute("recipe-id");
    this.controller.addRecipeIngredientsToShoppingList(this.controller.getRecipeFromFavouritesById(recipeId));
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
    this.controller.addRecipeIngredientsToShoppingList(this.controller.getRecipeFromLastSearchResultsById(recipeId)); // this app will be notified when the application state changes
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