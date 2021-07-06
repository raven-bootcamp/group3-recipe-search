import logger from "../util/SimpleDebug.js";

export default class ShoppingList {
    constructor(document) {
        this.document = document;
    }
    render(shoppingList) {
        logger.log("Rendering shopping list",10);
        logger.log(shoppingList,10);
        // clear the current shopping list and redraw dynamically

    }
}