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
        logger.log("Rendering search results",10);
        logger.log(arrayOfRecipes,10);

        this.domUtils.removeAllChildNodes(this.divElement);

        let index = 0
        while((index < 4) && (index < arrayOfRecipes.length)) {
            let recipe = arrayOfRecipes[index];

            let recipesSearchElement = () =>  (
                <div class="column is-mobile is-3-tablet is-3-desktop">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title is-size-5">
                                <a href={recipe.URL}>{recipe.name}</a>
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
                            <img src={recipe.imageURL} alt={recipe.name}/>
                        </div>
                    </div>
                </div>
            );

            this.divElement.appendChild(recipesSearchElement());
            index++;
        }





        var displaySearchResults = function (results) {
            if (results.length === 0) {
                resultsList.textContent = "No recipes found!";
                return;
            }

            for (var i = 0; i < results; i++) {
                var recipeName = results[i].recipeName // UPDATE KEY to whatever this is
                var recipeImg = results[i].recipeImg // Update to whatever this is

                // populate recipe name
                var recipeCardTitle = document.querySelector("#results-title-" + i);
                recipeCardTitle.textContent = recipeName
                recipeCardTitle.setAttribute("href", handleEventShowRecipeDetails(recipeName));

                // populate recipe image
                var recipeCardImg = document.querySelector("#results-img-" + i);
                recipeCardImg.src = recipeImg;
                recipeCardImg.setAttribute("href", handleEventShowRecipeDetails(recipeName));
            }


        }

    }
}