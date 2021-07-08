/** @jsx createElement */

/*** @jsxFrag createFragment */
import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import { createFragment, createElement } from "../util/ui/JsxProcessor.js";

var RecipeSearchResults = /*#__PURE__*/function () {
  function RecipeSearchResults(application, document) {
    this.application = application;
    this.document = document;
    this.elementId = "search-results";
    this.divElement = this.document.getElementById(this.elementId);
    this.domUtils = new DOMUtil(this.document);
  }

  var _proto = RecipeSearchResults.prototype;

  _proto.render = function render(arrayOfRecipes) {
    var _this = this;

    // clear the current results list and redraw dynamically
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering search results");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(arrayOfRecipes);
    this.domUtils.removeAllChildNodes(this.divElement);
    var index = 0;

    var _loop = function _loop() {
      var recipe = arrayOfRecipes[index];

      var recipesSearchElement = function recipesSearchElement() {
        return createElement("div", {
          class: "column is-mobile is-3-tablet is-3-desktop"
        }, createElement("div", {
          class: "card"
        }, createElement("header", {
          class: "card-header"
        }, createElement("p", {
          class: "card-header-title is-size-5"
        }, createElement("a", {
          target: "_blank",
          href: recipe.URL
        }, recipe.name)), createElement("span", {
          class: "icon-text is-size-5 is-pulled-right pr-4 mt-4"
        }, createElement("span", {
          "recipe-id": recipe.id,
          class: "icon"
        }, createElement("i", {
          "recipe-id": recipe.id,
          class: "fas fa-star",
          onClick: _this.application.handleEventAddRecipeToFavourites
        }))), createElement("span", {
          class: "icon-text is-size-5 is-pulled-right pr-4 mt-4"
        }, createElement("span", {
          "recipe-id": recipe.id,
          class: "icon"
        }, createElement("i", {
          "recipe-id": recipe.id,
          class: "fas fa-shopping-cart",
          onClick: _this.application.handleEventAddRecipeToShoppingList
        })))), createElement("div", {
          class: "card-image has-text-centered"
        }, createElement("img", {
          class: "recipe-clickable-image",
          "recipe-id": recipe.id,
          src: recipe.imageURL,
          alt: recipe.name,
          onClick: _this.application.handleEventShowRecipeDetailsFromSearch
        }))));
      };

      _this.divElement.appendChild(recipesSearchElement());

      index++;
    };

    while (index < 4 && index < arrayOfRecipes.length) {
      _loop();
    }
  };

  return RecipeSearchResults;
}();

export { RecipeSearchResults as default };