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

    render(recipe,isFavourite=false) {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering recipe details");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(recipe);
        // clear the current recipe details and redraw dynamically
        // clear the current shopping list and redraw dynamically
        let element = this.document.getElementById(this.elementId);
        this.domutil.removeAllChildNodes(element);

        let favouriteHandler = this.application.handleEventAddRecipeToFavourites;
        let shoppingListHandler = this.application.handleEventAddRecipeToShoppingList;
        if (isFavourite) {
            favouriteHandler = () => {
                if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering recipe details");if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Recipe is already a favourite");
            }; // is already favourite, do nothing
            shoppingListHandler = this.application.handleEventAddFavouriteRecipeToShoppingList;
        }

        let recipeDetailsEl = () =>  (
            <div class="modal-background">
                <div class="modal-card pt-5">
                    <header class="modal-card-head">
                        <p id="recipe-details-title" class="modal-card-title"><a target="_blank" href={recipe.URL}>{recipe.name}</a></p>
                        <button class="delete modal-close-button" aria-label="close" onClick={this.modalHandler.hideModal}></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="recipe-details-content">
                            <div class="recipe-image has-text-centered">
                                <img id="recipe-details-img" src={recipe.imageURL} alt={recipe.name}/>
                            </div>
                            <ul id="recipe-details-content">
                            </ul>
                            <div>
                                <p id="recipe-details-dietary">{recipe.diet}</p>
                                <p id="recipe-details-mealType">{recipe.mealType}</p>
                            </div>
                        </div>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button modal-close-button" onClick={this.modalHandler.hideModal}>Close</button>
                        <div class="is-pulled-right">
                            <a recipe-id={recipe.id} class="modal-shopping-item is-pulled-right" id="ingredient-add-btn" onClick={shoppingListHandler}>
                                <i recipe-id={recipe.id} class="fas fa-shopping-cart"></i>
                            </a>
                            <a recipe-id={recipe.id} class="modal-fav-item is-pulled-right" id="recipe-favourite-btn" onClick={favouriteHandler}>
                                <i recipe-id={recipe.id} class="fas fa-star"></i>
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        );

        element.appendChild(recipeDetailsEl());
        let ingredientListEl = element.querySelector("#recipe-details-content");
        this.domutil.removeAllChildNodes(ingredientListEl)
        for (let index =0;index < recipe.ingredients.length;index++) {
            let ingredientEl = document.createElement("li");
            ingredientEl.innerText = recipe.ingredients[index];
            ingredientListEl.appendChild(ingredientEl);
        }

    }

    show() {
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Showing recipe details");
        this.modalHandler.showModal(this.elementId);
    }

}