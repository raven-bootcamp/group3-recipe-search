import logger from './util/SimpleDebug.js';
import fetchUtil from "./util/FetchUtil.js";
import LocalStorageUtil from "./util/LocalStorageUtil.js";
import stateManager from "./util/ui/StateManagementUtil.js";


export default class Controller {

    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.lsUtil = new LocalStorageUtil(clientSideStorage);

        // setup query URLs
        this.queryURLRecipesSearch = "/recipes";

        // setup local storage key and previous searches array
        this.shoppingListKey = "shoppinglist";
        this.favouriteRecipesKey = "favouriterecipes";
        this.recipeSearchResultsKey = "recipesearch";

        // setup state management listeners
        this.listenForRecipeSearchResultsStateChange = this.listenForRecipeSearchResultsStateChange.bind(this);
        this.listenForFavouriteRecipesStateChange = this.listenForFavouriteRecipesStateChange.bind(this);
        this.listenForShoppingListStateChange = this.listenForShoppingListStateChange.bind(this);

        // setup state management
        stateManager.setStateByName(this.recipeSearchResultsKey,[]);
        stateManager.addChangeListenerForName(this.recipeSearchResultsKey,this.listenForRecipeSearchResultsStateChange)
        stateManager.setStateByName(this.favouriteRecipesKey,[]);
        stateManager.addChangeListenerForName(this.favouriteRecipesKey,this.listenForFavouriteRecipesStateChange)
        stateManager.setStateByName(this.shoppingListKey,[]);
        stateManager.addChangeListenerForName(this.shoppingListKey,this.listenForShoppingListStateChange)

        // setup Async callbacks for the fetch requests
        this.callbackForRecipeSearch = this.callbackForRecipeSearch.bind(this);

    }

    initialise() {
        // get the initial state for display - shopping list and favourite recipes and blank set of recipes for search
        this.getFavouriteRecipes();
        this.getShoppingList();
        stateManager.setStateByName(this.recipeSearchResultsKey,[]);
    }

    listenForRecipeSearchResultsStateChange(name, newState) {
        this.applicationView.handleRecipeSearchResultsChange(newState);
    }

    listenForFavouriteRecipesStateChange(name, newState) {
        this.applicationView.handleFavouriteRecipesChange(newState);
    }

    listenForShoppingListStateChange(name, newState) {
        this.applicationView.handleShoppingListChange(newState);
    }

    _createRecipeFromEdamamRecipe(edamamRecipe) {
        let recipeId = edamamRecipe.uri.split("_",2)[1];
        let mealTypes = edamamRecipe.mealType;
        if ((mealTypes === null) || (mealTypes === undefined)) {
            mealTypes = ["Not supplied"];
        }
        let dietLabels = edamamRecipe.dietLabels;
        if ((dietLabels === null) || (dietLabels === undefined)) {
            dietLabels = ["Not supplied"];
        }

        let recipe = {
            id: recipeId,
            name: edamamRecipe.label,
            imageURL: edamamRecipe.image,
            calories: Math.round(edamamRecipe.calories),
            mealType: mealTypes[0],
            diet: dietLabels[0],
            ingredients: edamamRecipe.ingredientLines,
            URL: edamamRecipe.url
        }
        return recipe;
    }

    callbackForRecipeSearch(jsonData, httpStatus = 200) {
        logger.log(`Callback Recipe Search with status ${httpStatus}`, 3);
        let rootEl = document.getElementById("root");
        let recipes = [];

        if (httpStatus >= 200 && httpStatus <= 299) { // do we have any data?
            logger.log(jsonData, 100);
            let edamamRecipes = jsonData.hits;
            logger.log(edamamRecipes, 100);
            for (let index = 0; index < edamamRecipes.length; index++) {
                let edamamRecipe = edamamRecipes[index].recipe;
                logger.log(edamamRecipe, 100);
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
        stateManager.setStateByName(this.recipeSearchResultsKey,recipes);

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
        let hasDietSelection = (isBalancedDiet || isHighFiber || isHighProtein || isLowCarb || isLowFat || isLowSodium);
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
        fetchUtil.fetchQLJSON(this.queryURLRecipesSearch, parameters, this.callbackForRecipeSearch);
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
    __comparingRecipeWithIdFunction(recipe, id) {
        return (recipe.id === id);
    }

    /* get the current set of favourite recipes
       Will return recipe objects, the same as for a search
    */
    getFavouriteRecipes() {
        let favouriteRecipes = this.lsUtil.getWithStorageKey(this.favouriteRecipesKey);
        stateManager.setStateByName(this.favouriteRecipesKey,favouriteRecipes);
        return favouriteRecipes;

    }

    /*
    Add a new recipe to the favourite recipes
    Pass in a recipe object (from a search)
    Returns the modified list of favourite recipes
     */
    addRecipeToFavouriteRecipes(recipeObjFromSearch) {
        this.lsUtil.addNewItemToKeyStorage(this.favouriteRecipesKey,recipeObjFromSearch);
        let favouriteRecipes = this.lsUtil.getWithStorageKey(this.favouriteRecipesKey);
        stateManager.setStateByName(this.favouriteRecipesKey,favouriteRecipes);
        return favouriteRecipes;
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
        this.lsUtil.removeItemFromKeyStorageWithFunctionForEquality(this.favouriteRecipesKey,recipeId,this.__comparingRecipeWithIdFunction)
        let favouriteRecipes = this.lsUtil.getWithStorageKey(this.favouriteRecipesKey);
        stateManager.setStateByName(this.favouriteRecipesKey,favouriteRecipes);
        return favouriteRecipes;
    }
}
