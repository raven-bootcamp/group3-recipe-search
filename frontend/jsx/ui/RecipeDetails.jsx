/** @jsx createElement */
/*** @jsxFrag createFragment */

import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import {createFragment,createElement} from "../util/ui/JsxProcessor.js";
import modalHandler from "../util/ui/ModalHandler.js";


export default class RecipeDetails {
    constructor(application,document,modalHandler) {
        this.application = application;
        this.document = document;
        this.modalHandler = modalHandler;
        this.elementId = "recipe-details";

        this.domutil = new DOMUtil(document);
        this.modalHandler.addNewModal(this.elementId);
    }

    render(recipe) {
        logger.log("Rendering recipe details",10);
        logger.log(recipe,10);
        // clear the current recipe details and redraw dynamically
        // clear the current shopping list and redraw dynamically
        let element = this.document.getElementById(this.elementId + "-content");
        this.domutil.removeAllChildNodes(element);
        let recipeDetailsElement = () =>  (
            <li>
                <button recipe={recipe} className="button is-fullwidth is-info is-outlined is-rounded">
                    <span recipe={recipe}>{recipe.name}</span>
                </button>
            </li>
        );
        element.appendChild(recipeDetailsElement());

    }

    show() {
        logger.log("Showing recipe details",10);
        this.modalHandler.showModal(this.elementId);
    }

}