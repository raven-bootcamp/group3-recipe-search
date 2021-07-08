/** @jsx createElement */
/*** @jsxFrag createFragment */

import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import {createFragment,createElement} from "../util/ui/JsxProcessor.js";

export default class RecipeSearchResults {
    constructor(application,document) {
        this.application = application;
        this.document = document;
        this.elementId = "search-results";
        this.divElement = this.document.getElementById(this.elementId);
        this.domUtils = new DOMUtil(this.document);
    }

    render(arrayOfRecipes) {
        // clear the current results list and redraw dynamically
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering search results");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(arrayOfRecipes);

        this.domUtils.removeAllChildNodes(this.divElement);

        let index = 0
        while((index < 4) && (index < arrayOfRecipes.length)) {
            let recipe = arrayOfRecipes[index];

            let recipesSearchElement = () =>  (
                <div class="column is-mobile is-3-tablet is-3-desktop">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-size-5">
                                <a target="_blank" href={recipe.URL}>{recipe.name}</a>
                            </p>
                            <span class="icon-text is-size-5 is-pulled-right pr-4 mt-4">
                                <span recipe-id={recipe.id} class="icon">
                                    <i recipe-id={recipe.id} class="fas fa-star" onClick={this.application.handleEventAddRecipeToFavourites}></i>
                                </span>
                            </span>
                            <span class="icon-text is-size-5 is-pulled-right pr-4 mt-4">
                                <span recipe-id={recipe.id} class="icon">
                                    <i recipe-id={recipe.id} class="fas fa-shopping-cart" onClick={this.application.handleEventAddRecipeToShoppingList}></i>
                                </span>
                            </span>
                        </header>
                        <div class="card-image has-text-centered">
                            <img class="recipe-clickable-image" recipe-id={recipe.id} src={recipe.imageURL} alt={recipe.name} onClick={this.application.handleEventShowRecipeDetailsFromSearch}/>
                        </div>
                    </div>
                </div>
            );

            this.divElement.appendChild(recipesSearchElement());
            index++;
        }
    }
}