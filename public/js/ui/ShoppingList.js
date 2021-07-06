import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";

export default class ShoppingList {
    constructor(application,document) {
        this.document = document;
        this.application = application;
        this.domutil = new DOMUtil(document);
    }
    render(shoppingList) {
        logger.log("Rendering shopping list",10);
        logger.log(shoppingList,10);
        // clear the current shopping list and redraw dynamically
        let element = this.document.getElementById("shopping-list-content");
        this.domutil.removeAllChildNodes(element);
        // add the ingredients as buttons under list items
        for (let index = 0;index <= shoppingList.length;index++) {
            let buttonEl = this.domutil.addDeleteButtonAsListItemOfParent(shoppingList[index],element);
            buttonEl.addEventListener("click",this.application.handleEventRemoveIngredientFromShoppingList);
        }
    }

    show() {
        logger.log("Showing shopping list",10);
        let element = this.document.getElementById("shopping-list");
        element.classList.add("is-active");
    }
}