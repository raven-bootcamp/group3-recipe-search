import logger from './util/SimpleDebug.js';
import fetchUtil from "./util/FetchUtil.js";


export default class Controller {

    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;
        this.fetchUtility = fetchUtil;

        // setup query URLs
        this.queryURL = "";

        // setup local storage key and previous searches array
        this.localStorageKey1 = "";
        this.localStorageItems1 = [];


        // setup event handlers and local storage access call
        this.handleExampleEvent = this.handleExampleEvent.bind(this);
        this.getLocalStorageItems1 = this.getLocalStorageItems1.bind(this);

        // setup Async callbacks for the fetch requests
        this.callbackForFetchFromAPI = this.callbackForFetchFromAPI.bind(this);
        this.callbackForRecipeSearch = this.callbackForRecipeSearch.bind(this);

    }

    handleExampleEvent(event) {

    }

    getLocalStorageItems1() {
        return [];
    }

    /* example interface used from the callback for FetchUtil */
    callbackForFetchFromAPI(jsonData, httpStatus) {

    }

    _createRecipeFromEdamamRecipe(edamamRecipe) {
        let recipeId = edamamRecipe.uri.split("_",2)[1];
        let recipe = {
            id: recipeId,
            name: edamamRecipe.label,
            imageURL: edamamRecipe.image,
            calories: Math.round(edamamRecipe.calories),
            mealType: edamamRecipe.mealType,
            diet: edamamRecipe.dietLabels[0],
            ingredients: edamamRecipe.ingredientLines
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
        this.applicationView.receiveRecipeSearchResults(recipes);
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
        fetchUtil.fetchQLJSON("/recipes", parameters, this.callbackForRecipeSearch);
    }


}
