import logger from "../util/SimpleDebug.js";

export default class FavouriteRecipes {
    constructor(document) {
        this.document = document;
    }

    render(arrayOfFavouriteRecipes) {
        logger.log("Rendering favourite recipes",10);
        logger.log(arrayOfFavouriteRecipes,10);
        // clear the current favourite recipe list and redraw dynamically
    }

    show() {

    }
}