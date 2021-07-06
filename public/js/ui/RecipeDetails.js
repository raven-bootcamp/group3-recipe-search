import logger from "../util/SimpleDebug.js";

export default class RecipeDetails {
    constructor(document) {
        this.document = document;
    }

    render(recipe) {
        logger.log("Rendering recipe details",10);
        logger.log(recipe,10);
        // clear the current recipe details and redraw dynamically

    }

    show() {
        logger.log("Showing recipe details",10);
    }
}