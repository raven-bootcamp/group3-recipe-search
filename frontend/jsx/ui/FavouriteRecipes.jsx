/** @jsx createElement */
/*** @jsxFrag createFragment */

import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import {createFragment,createElement} from "../util/ui/JsxProcessor.js";
import modalHandler from "../util/ui/ModalHandler.js";


export default class FavouriteRecipes {
    constructor(application,document,modalHandler) {
        this.application = application;
        this.document = document;
        this.modalHandler = modalHandler;
        this.elementId = "favourite-recipes";

        this.domutil = new DOMUtil(document);
        this.modalHandler.addNewModal(this.elementId);
    }

    render(arrayOfFavouriteRecipes) {
        logger.log("Rendering favourite recipe list",10);
        logger.log(arrayOfFavouriteRecipes,10);
        // clear the current shopping list and redraw dynamically
        let element = this.document.getElementById(this.elementId + "-content");
        this.domutil.removeAllChildNodes(element);

        for (let index = 0; index < arrayOfFavouriteRecipes.length; index++) {
            let recipe = arrayOfFavouriteRecipes[index];
            if (recipe == null) break;
            let recipesListElement = () =>  (
                <li>
                    <button recipe-id={recipe.id} class="button     is-info is-outlined is-rounded" onClick={this.application.handleEventShowRecipeDetailsFromFavourites}>
                        <span recipe-id={recipe.id}>{recipe.name}</span>
                    </button>
                    <button recipe-id={recipe.id} class="delete mt-3 ml-2" onClick={this.application.handleEventRemoveRecipeFromFavourites}>
                        <span recipe-id={recipe.id} className="icon is-large">
                            <i recipe-id={recipe.id} className="fas fa-times"></i>
                        </span>
                    </button>
                </li>
            );
            element.appendChild(recipesListElement());
        }

    }

    show() {
        logger.log("Showing favourite recipes",10);
        this.modalHandler.showModal(this.elementId);
    }

}