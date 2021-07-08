/** @jsx createElement */
/*** @jsxFrag createFragment */

import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import {createFragment,createElement} from "../util/ui/JsxProcessor.js";
import modalHandler from "../util/ui/ModalHandler.js";


export default class ShoppingList {
    constructor(application,document,modalHandler) {
        this.application = application;
        this.document = document;
        this.modalHandler = modalHandler;
        this.elementId = "shopping-list";

        this.domutil = new DOMUtil(document);
        this.modalHandler.addNewModal(this.elementId);
    }

    render(shoppingList) {
        logger.log("Rendering shopping list",10);
        logger.log(shoppingList,10);
        // clear the current shopping list and redraw dynamically
        let element = this.document.getElementById(this.elementId + "-content");
        this.domutil.removeAllChildNodes(element);

        for (let index = 0; index < shoppingList.length; index++) {
            let shoppingListElement = () =>  (
                    <button class="button is-fullwidth is-info is-outlined is-rounded" onClick={this.application.handleEventRemoveIngredientFromShoppingList}>
                        <span>{shoppingList[index]}</span>
                        <span class="icon is-small">
                            <i class="fas fa-times"></i>
                        </span>
                    </button>
            );
            element.appendChild(shoppingListElement());
        }

    }

    show() {
        logger.log("Showing shopping list",10);
        this.modalHandler.showModal(this.elementId);
    }

}