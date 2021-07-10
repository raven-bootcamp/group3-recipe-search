import logger from './util/SimpleDebug.js';
import fetchUtil from "./util/FetchUtil.js";
import LocalStorageUtil from "./util/LocalStorageUtil.js";
import stateManager from "./util/StateManagementUtil.js";


export default class Controller {

    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.lsUtil = new LocalStorageUtil(clientSideStorage);


        // setup query URLs
        this.queryURLRecipesSearch = "/recipes";
        this.supermarketURLSearch = "/supermarkets";

        // setup local storage key and previous searches array
        this.shoppingListKey = "shoppinglist";
        this.favouriteRecipesKey = "favouriterecipes";
        this.recipeSearchResultsKey = "recipesearch";
        this.locationSearchResultsKey = "locations";

        // setup state management listeners
        this.listenForRecipeSearchResultsStateChange = this.listenForRecipeSearchResultsStateChange.bind(this);
        this.listenForFavouriteRecipesStateChange = this.listenForFavouriteRecipesStateChange.bind(this);
        this.listenForShoppingListStateChange = this.listenForShoppingListStateChange.bind(this);
        this.listenForLocationListStateChange = this.listenForLocationListStateChange.bind(this);

        // setup state management
        stateManager.setStateByName(this.recipeSearchResultsKey,[]);
        stateManager.addChangeListenerForName(this.recipeSearchResultsKey,this.listenForRecipeSearchResultsStateChange)
        stateManager.setStateByName(this.favouriteRecipesKey,[]);
        stateManager.addChangeListenerForName(this.favouriteRecipesKey,this.listenForFavouriteRecipesStateChange)
        stateManager.setStateByName(this.shoppingListKey,[]);
        stateManager.addChangeListenerForName(this.shoppingListKey,this.listenForShoppingListStateChange)
        stateManager.setStateByName(this.locationSearchResultsKey,[]);
        stateManager.addChangeListenerForName(this.locationSearchResultsKey,this.listenForLocationListStateChange);

        //location callbacks
        this.callbackSearchForSupermarketsWithLocation = this.callbackSearchForSupermarketsWithLocation.bind(this);
        this.callbackSearchForSupermarketsWithoutLocation = this.callbackSearchForSupermarketsWithoutLocation.bind(this);

        // setup Async callbacks for the fetch requests
        this.callbackForRecipeSearch = this.callbackForRecipeSearch.bind(this);
        this.callbackForLocationSearch = this.callbackForLocationSearch.bind(this);
    }

    listenForLocationListStateChange(name, locations) {
        this.applicationView.setState({showLocations:true,locations:locations});
    }

    listenForRecipeSearchResultsStateChange(name, recipes) {
        let totalPages = Math.ceil(recipes.length/this.applicationView.state.resultsPerPage);
        this.applicationView.setState({searchResults:recipes,selectedRecipe:null,selectedRecipeIsFavourite:false,currentPageNumber:1,totalPages:totalPages});
    }

    listenForFavouriteRecipesStateChange(name, favouriteRecipes) {
        this.applicationView.setState({favouriteRecipes:favouriteRecipes});
    }

    listenForShoppingListStateChange(name, shoppingList) {
        this.applicationView.setState({shoppingList:shoppingList});
    }

    _createRecipeFromEdamamRecipe(edamamRecipe) {
        let recipeId = edamamRecipe.uri.split("_",2)[1];
        let mealTypes = edamamRecipe.mealType;
        if ((mealTypes === null) || (mealTypes === undefined) || (mealTypes.length === 0)) {
            mealTypes = ["Not supplied"];
        }
        let dietLabels = edamamRecipe.dietLabels;
        if ((dietLabels === null) || (dietLabels === undefined) || (dietLabels.length === 0)) {
            dietLabels = ["Not supplied"];
        }

        let recipe = {
            id: recipeId,
            name: edamamRecipe.label,
            imageURL: edamamRecipe.image,
            calories: Math.round(edamamRecipe.calories),
            mealType: mealTypes,
            diet: dietLabels,
            ingredients: edamamRecipe.ingredientLines,
            URL: edamamRecipe.url
        }
        return recipe;
    }
    callbackForLocationSearch(jsonData, httpStatus = 200) {
        if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(`Callback Recipe Search with status ${httpStatus}`, 3);
        let googleLocations = [];
        if (httpStatus >= 200 && httpStatus <= 299) { // do we have any data?
            if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(jsonData);
            let locations = jsonData.candidates;
            if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(locations);
            for (let index = 0; index < locations.length; index++) {
                let location = locations[index];
                if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(location);
                let googleLocation = {
                    name: location.name,
                    address: location.formatted_address,
                    isOpen: (location.opening_hours)?location.opening_hours.open_now:false,
                    lat:location.geometry.location.lat,
                    lon:location.geometry.location.lng
                }
                googleLocations.push(googleLocation);
            }
        }
        this.lsUtil.saveWithStorageKey(this.locationSearchResultsKey,googleLocations);
        stateManager.setStateByName(this.locationSearchResultsKey,googleLocations);
    }

    callbackForRecipeSearch(jsonData, httpStatus = 200) {
        if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(`Callback Recipe Search with status ${httpStatus}`, 3);
        let rootEl = document.getElementById("root");
        let recipes = [];

        if (httpStatus >= 200 && httpStatus <= 299) { // do we have any data?
            if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(jsonData);
            let edamamRecipes = jsonData.hits;
            if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(edamamRecipes);
            for (let index = 0; index < edamamRecipes.length; index++) {
                let edamamRecipe = edamamRecipes[index].recipe;
                if (logger.isOn() && (200 <= logger.level()) && (200 >= logger.minlevel())) console.log(edamamRecipe);
                /*
                   recipes is an array of objects that contain the following information:
                   id  - is the EDAMAM id - will be needed for a new call
                   name,
                   imageURL,
                   calories - a number of calories (cal),
                   ingredients - an array of strings with the ingredients
                   mealType - string [Breakfast|Dinner|etc]
                   diet - string [Balanced|Gluten-free|etc]

                   if the array is empty (length 0) then there are no matching recipes or there was a web error (can't get data)
                */
                let recipe = this._createRecipeFromEdamamRecipe(edamamRecipe);
                recipes.push(recipe);
            }
        }
        this.lsUtil.saveWithStorageKey(this.recipeSearchResultsKey,recipes);
        stateManager.setStateByName(this.recipeSearchResultsKey,recipes);
        this.applicationView.searchEnded();
    }

    getRecipeFromLastSearchResultsById(recipeId) {
        let arrayOfRecipes = stateManager.getStateByName(this.recipeSearchResultsKey);
        let foundIndex = arrayOfRecipes.findIndex((recipe) => recipe.id == recipeId);
        return arrayOfRecipes[foundIndex];
    }

    getRecipeFromFavouritesById(recipeId) {
        let arrayOfRecipes = stateManager.getStateByName(this.favouriteRecipesKey);
        let foundIndex = arrayOfRecipes.findIndex((recipe) => recipe.id == recipeId);
        return arrayOfRecipes[foundIndex];
    }


    /* provide the interface for the API call */
    searchForRecipes(
        queryText = "",
        isBalancedDiet = false,
        isHighFiber = false,
        isHighProtein = false,
        isLowCarb = false,
        isLowFat = false,
        isLowSodium = false,
        isDiaryFree = false,
        isGlutenFree = false,
        isKosher = false,
        isVegan = false,
        isVegetarian = false,
        isDiabetic = false,
        isBreakfast = false,
        isLunch = false,
        isDinner = false,
        isSnack = false
    ) {
        // Do we have a diet restriction?
        let hasDietSelection = (isBalancedDiet || isHighFiber || isHighProtein || isLowCarb || isLowFat || isLowSodium); // removed high fibre
        let hasHealthSelection = (isDiaryFree || isGlutenFree || isKosher || isVegan || isVegetarian || isDiabetic);
        let hasMealTypeSelection = (isBreakfast || isLunch || isDinner || isSnack);
        // construct the parameters for the JSON call
        let parameters = {
            q: queryText,
            hasDietSelection: hasDietSelection,
            hasHealthSelection: hasHealthSelection,
            hasMealTypeSelection: hasMealTypeSelection,
            isBalancedDiet: isBalancedDiet,
            isHighFiber: isHighFiber,
            isHighProtein: isHighProtein,
            isLowCarb: isLowCarb,
            isLowFat: isLowFat,
            isLowSodium: isLowSodium,
            isDiaryFree: isDiaryFree,
            isGlutenFree: isGlutenFree,
            isKosher: isKosher,
            isVegan: isVegan,
            isVegetarian: isVegetarian,
            isDiabetic: isDiabetic,
            isBreakfast: isBreakfast,
            isLunch: isLunch,
            isDinner: isDinner,
            isSnack: isSnack

        };
        /* execute the asychronous fetch request and receive the results in the callback function */
        this.applicationView.searchStarted();

        fetchUtil.fetchQLJSON(this.queryURLRecipesSearch, parameters, this.callbackForRecipeSearch);
    }

    callbackSearchForSupermarketsWithLocation(location) {
        // construct the parameters for the JSON call
        let parameters = {
            lat: location.coords.latitude,
            lon: location.coords.longitude
        };

        fetchUtil.fetchQLJSON(this.supermarketURLSearch, parameters, this.callbackForLocationSearch);
    }

    callbackSearchForSupermarketsWithoutLocation() {
        // construct the parameters for the JSON call
        let parameters = {};

        fetchUtil.fetchQLJSON(this.supermarketURLSearch, parameters, this.callbackForLocationSearch);

    }
    searchForSupermarkets() {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(this.callbackSearchForSupermarketsWithLocation,this.callbackSearchForSupermarketsWithoutLocation);
        }
    }

    /*
       Get the current contents of the saved shopping list
       Returns the current saved ingredient list (array of strings)
    */
    getShoppingList() {
        let shoppingList = this.lsUtil.getWithStorageKey(this.shoppingListKey);
        stateManager.setStateByName(this.shoppingListKey,shoppingList);
        return shoppingList;
    }

    getPreviousSearch(isStateChange = true) {
        let previousSearch = this.lsUtil.getWithStorageKey(this.recipeSearchResultsKey);
        if (isStateChange) stateManager.setStateByName(this.recipeSearchResultsKey,previousSearch);
        return previousSearch;
    }

    getLocations() {
        let locations = this.lsUtil.getWithStorageKey(this.locationSearchResultsKey);
        stateManager.setStateByName(this.locationSearchResultsKey,locations);
        return locations;
    }

    /*
       Add ingredient list to the saved shopping list
       Pass in the recipe object obtained from the search call
       Returns the modified shopping list for display
    */
    addRecipeIngredientsToShoppingList(recipeObjFromSearch) {
        for (let index=0;index < recipeObjFromSearch.ingredients.length;index++) {
            this.lsUtil.addNewItemToKeyStorage(this.shoppingListKey,recipeObjFromSearch.ingredients[index]);
        }
        let shoppingList = this.lsUtil.getWithStorageKey(this.shoppingListKey);
        stateManager.setStateByName(this.shoppingListKey,shoppingList);
        return shoppingList;
    }

    /*
      Remove an ingredient (by name) from the saved shopping list
      Returns the modified saved list for display
    */
    removeIngredientFromShoppingList(ingredientItem) {
        this.lsUtil.removeItemFromKeyStorage(this.shoppingListKey,ingredientItem);
        let shoppingList = this.lsUtil.getWithStorageKey(this.shoppingListKey);
        stateManager.setStateByName(this.shoppingListKey,shoppingList);
        return shoppingList;
    }

    /* this function is used to compare a recipe with an id in the local storage using the id value */
    isSameRecipeById(recipe, id) {
        return (recipe.id == id);
    }

    isSameRecipe(recipe1, recipe2) {
        return (recipe1.id === recipe2.id);
    }

    /* get the current set of favourite recipes
       Will return recipe objects, the same as for a search
    */
    getFavouriteRecipes() {
        let favouriteRecipes = this.lsUtil.getWithStorageKey(this.favouriteRecipesKey);
        stateManager.setStateByName(this.favouriteRecipesKey,favouriteRecipes);
        return favouriteRecipes;
    }

    // is the recipe already in the favourite recipe list?
    isRecipeAlreadyAFavourite(recipeObj) {
        return this.lsUtil.isItemInKeyStorageWithFunctionForEquality(this.favouriteRecipesKey,recipeObj,this.isSameRecipe);
    }


    /*
    Add a new recipe to the favourite recipes
    Pass in a recipe object (from a search)
    Returns whether the recipe was added
     */
    addRecipeToFavouriteRecipes(recipeObjFromSearch) {
        let result = false;
        let favouriteRecipes = this.lsUtil.getWithStorageKey(this.favouriteRecipesKey);
        if (!this.isRecipeAlreadyAFavourite(recipeObjFromSearch)) {
            this.lsUtil.addNewItemToKeyStorage(this.favouriteRecipesKey,recipeObjFromSearch);
            stateManager.setStateByName(this.favouriteRecipesKey,favouriteRecipes);
            result = true;
        }
        return result;
    }

    /*
      Remove a recipe from the favourite recipes list
      Pass in a recipe object (from a search)
      Returns the modified list of favourite recipes
     */
    removeRecipeFromFavouriteRecipes(recipeObjectFromSearch) {
        return this.removeRecipeFromFavouriteRecipesById(recipeObjectFromSearch.id);
    }


    /*
    Remove a recipe from the favourite recipes list
    Pass in a recipe id from the recipe object
    Returns the modified list of favourite recipes
     */
    removeRecipeFromFavouriteRecipesById(recipeId) {
        this.lsUtil.removeItemFromKeyStorageWithFunctionForEquality(this.favouriteRecipesKey,recipeId,this.isSameRecipeById)
        let favouriteRecipes = this.lsUtil.getWithStorageKey(this.favouriteRecipesKey);
        stateManager.setStateByName(this.favouriteRecipesKey,favouriteRecipes);
        return favouriteRecipes;
    }


}
