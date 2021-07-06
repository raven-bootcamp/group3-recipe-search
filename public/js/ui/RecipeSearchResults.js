import logger from "../util/SimpleDebug.js";

export default class RecipeSearchResults {
    constructor(document) {
        this.document = document;
    }

    render(arrayOfRecipes) {
        // clear the current results list and redraw dynamically
        logger.log("Rendering search results",10);
        logger.log(arrayOfRecipes,10);

    }
}