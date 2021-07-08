/** @jsx createElement */
/*** @jsxFrag createFragment */

import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import {createElement} from "../util/ui/JsxProcessor.js";


export default class ShoppingList {
    constructor(application, document, modalHandler) {
        this.application = application;
        this.document = document;
        this.modalHandler = modalHandler;
        this.elementId = "shopping-list";

        this.domutil = new DOMUtil(document);
        this.modalHandler.addNewModal(this.elementId);
    }

    render(shoppingList) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering shopping list");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(shoppingList);
        // clear the current shopping list and redraw dynamically
        let element = this.document.getElementById(this.elementId + "-content");
        this.domutil.removeAllChildNodes(element);

        for (let index = 0; index < shoppingList.length; index++) {
            let ingredient = shoppingList[index];
            let shoppingListElement = () => (
                <button ingredient={ingredient} class="button is-fullwidth is-info is-outlined is-rounded"
                        onClick={this.application.handleEventRemoveIngredientFromShoppingList}>
                    <span ingredient={ingredient}>{ingredient}</span>
                    <span ingredient={ingredient} class="icon is-small">
                            <i ingredient={ingredient} class="fas fa-times"></i>
                        </span>
                </button>
            );
            element.appendChild(shoppingListElement());
        }

    }

    show() {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Showing shopping list");
        this.modalHandler.showModal(this.elementId);
    }

}