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
                <div className="column is-mobile is-3-tablet is-3-desktop recipe-1">
                    <div className="card">
                        <header className="card-header">
                            <span className="card-header-title is-size-5" id="results-title-1">
                                <a href={recipe.URL}>{recipe.name}</a>
                            </span>
                            <span className="icon-text is-size-5 is-pulled-right pr-4 mt-4"></span>
                            <span recipe-id={recipe.id} className="icon">
                                <i recipe-id={recipe.id} className="fas fa-heart" onClick={this.application.handleEventAddRecipeToFavourites}></i>
                            </span>

                            <span className="icon-text is-size-5 is-pulled-right pr-4 mt-4"></span>
                            <span recipe-id={recipe.id} className="icon">
                                <i recipe-id={recipe.id} className="fas fa-list" onClick={this.application.handleEventAddRecipeToShoppingList}></i>
                            </span>
                        </header>
                        <div className="card-image has-text-centered">
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