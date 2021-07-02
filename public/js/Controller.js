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

    callbackForRecipeSearch(jsonData, httpStatus = 200) {
        logger.log("Callback Recipe Search", 3);
        if (status >= 200 && status <= 299) { // do we have any data?

            logger.log(jsonData, 100);
            /* TO-DO add the recipes to the document */

        } else {
           /* TO-DO clear the recipe view and display an error? */

        }
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
            q:queryText,
            hasDietSelection: hasDietSelection,
            hasHealthSelection: hasHealthSelection,
            hasMealTypeSelection: hasMealTypeSelection,
            isBalancedDiet: isBalancedDiet,
            isHighFiber:isHighFiber,
            isHighProtein:isHighProtein,
            isLowCarb:isLowCarb,
            isLowFat:isLowFat,
            isLowSodium:isLowSodium,
            isDiaryFree:isDiaryFree,
            isGlutenFree:isGlutenFree,
            isKosher:isKosher,
            isVegan:isVegan,
            isVegetarian:isVegetarian,
            isDiabetic:isDiabetic,
            isBreakfast:isBreakfast,
            isLunch:isLunch,
            isDinner:isDinner,
            isSnack:isSnack

        };
        /* execute the asychronous fetch request and receive the results in the callback function */
        fetchUtil.fetchQLJSON("/recipes",parameters, this.callbackForRecipeSearch);
    }

    __testAPICall() {
        /* execute some test calls */
        this.searchForRecipes(); // no parameters given
        setTimeout(() => {
            this.searchForRecipes("onion")
        },3000); //simple ingredient
        /* some meal types selected */
        setTimeout(() => {
            this.searchForRecipes("",false,false,false,false,true, false,false,false,false,false,true,false,true);
        },6000);


    }

}
