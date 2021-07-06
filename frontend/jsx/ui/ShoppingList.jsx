import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
//import dom from "jsx-render";

export default class ShoppingList {
    constructor(application,document) {
        this.document = document;
        this.application = application;
        this.domutil = new DOMUtil(document);
        this.hide = this.hide.bind(this);

        let closeButtonEl = this.document.getElementById("close-shopping-list-delete-button");
        closeButtonEl.addEventListener("click",this.hide);
        closeButtonEl = this.document.getElementById("close-shopping-list-button");
        closeButtonEl.addEventListener("click",this.hide);
    }

    render(shoppingList) {
        logger.log("Rendering shopping list",10);
        logger.log(shoppingList,10);
        // clear the current shopping list and redraw dynamically
        let element = this.document.getElementById("shopping-list-content");
        this.domutil.removeAllChildNodes(element);

        const shoppingListItems = shoppingList.map((item, index) =>
            <li>
                <button className="button is-rounded is-success" onClick={this.application.handleEventRemoveIngredientFromShoppingList}>
                    <span>{item}</span>
                    <span className="icon is-small">
                       <i className="fas fa-times"></i>
                    </span>
                </button>
            </li>
        );
        element.appendChild(<shoppingListItems />);
    }

    show() {
        logger.log("Showing shopping list",10);
        let element = this.document.getElementById("shopping-list");
        element.classList.add("is-active");
    }

    hide(event) {
        logger.log("Hiding shopping list",10);
        let element = this.document.getElementById("shopping-list");
        element.classList.remove("is-active");
    }
}