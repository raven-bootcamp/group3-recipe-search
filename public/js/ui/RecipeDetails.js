/** @jsx createElement */

/*** @jsxFrag createFragment */
import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import { createFragment, createElement } from "../util/ui/JsxProcessor.js";
import modalHandler from "../util/ui/ModalHandler.js";

var RecipeDetails = /*#__PURE__*/function () {
  function RecipeDetails(application, document, modalHandler) {
    this.application = application;
    this.document = document;
    this.modalHandler = modalHandler;
    this.elementId = "recipe-details";
    this.domutil = new DOMUtil(document);
    this.modalHandler.addNewModal(this.elementId);
  }

  var _proto = RecipeDetails.prototype;

  _proto.render = function render(recipe, isFavourite) {
    var _this = this;

    if (isFavourite === void 0) {
      isFavourite = false;
    }

    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering recipe details");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(recipe); // clear the current recipe details and redraw dynamically
    // clear the current shopping list and redraw dynamically

    var element = this.document.getElementById(this.elementId);
    this.domutil.removeAllChildNodes(element);
    var favouriteHandler = this.application.handleEventAddRecipeToFavourites;
    var shoppingListHandler = this.application.handleEventAddRecipeToShoppingList;

    if (isFavourite) {
      favouriteHandler = function favouriteHandler() {
        if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering recipe details");
        if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Recipe is already a favourite");
      }; // is already favourite, do nothing


      shoppingListHandler = this.application.handleEventAddFavouriteRecipeToShoppingList;
    }

    var recipeDetailsEl = function recipeDetailsEl() {
      return createElement("div", {
        class: "modal-background"
      }, createElement("div", {
        class: "modal-card pt-5"
      }, createElement("header", {
        class: "modal-card-head"
      }, createElement("p", {
        id: "recipe-details-title",
        class: "modal-card-title"
      }, createElement("a", {
        target: "_blank",
        href: recipe.URL
      }, recipe.name)), createElement("button", {
        class: "delete modal-close-button",
        "aria-label": "close",
        onClick: _this.modalHandler.hideModal
      })), createElement("section", {
        class: "modal-card-body"
      }, createElement("div", {
        class: "recipe-details-content"
      }, createElement("div", {
        class: "recipe-image has-text-centered"
      }, createElement("img", {
        id: "recipe-details-img",
        src: recipe.imageURL,
        alt: recipe.name
      })), createElement("ul", {
        id: "recipe-details-content"
      }), createElement("div", null, createElement("p", {
        id: "recipe-details-dietary"
      }, recipe.diet), createElement("p", {
        id: "recipe-details-mealType"
      }, recipe.mealType)))), createElement("footer", {
        class: "modal-card-foot"
      }, createElement("button", {
        class: "button modal-close-button",
        onClick: _this.modalHandler.hideModal
      }, "Close"), createElement("div", {
        class: "is-pulled-right"
      }, createElement("a", {
        "recipe-id": recipe.id,
        class: "modal-shopping-item is-pulled-right",
        id: "ingredient-add-btn",
        onClick: shoppingListHandler
      }, createElement("i", {
        "recipe-id": recipe.id,
        class: "fas fa-shopping-cart"
      })), createElement("a", {
        "recipe-id": recipe.id,
        class: "modal-fav-item is-pulled-right",
        id: "recipe-favourite-btn",
        onClick: favouriteHandler
      }, createElement("i", {
        "recipe-id": recipe.id,
        class: "fas fa-star"
      }))))));
    };

    element.appendChild(recipeDetailsEl());
    var ingredientListEl = element.querySelector("#recipe-details-content");
    this.domutil.removeAllChildNodes(ingredientListEl);

    for (var index = 0; index < recipe.ingredients.length; index++) {
      var ingredientEl = document.createElement("li");
      ingredientEl.innerText = recipe.ingredients[index];
      ingredientListEl.appendChild(ingredientEl);
    }
  };

  _proto.show = function show() {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Showing recipe details");
    this.modalHandler.showModal(this.elementId);
  };

  return RecipeDetails;
}();

export { RecipeDetails as default };