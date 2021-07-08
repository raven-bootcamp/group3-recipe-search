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
    logger.log("Rendering search results", 10);
    logger.log(arrayOfRecipes, 10);
    this.domUtils.removeAllChildNodes(this.divElement);
    var index = 0;

    var _loop = function _loop() {
      var recipe = arrayOfRecipes[index];

      var recipesSearchElement = function recipesSearchElement() {
        return createElement("div", {
          className: "column is-mobile is-3-tablet is-3-desktop recipe-1"
        }, createElement("div", {
          className: "card"
        }, createElement("header", {
          className: "card-header"
        }, createElement("span", {
          className: "card-header-title is-size-5",
          id: "results-title-1"
        }, createElement("a", {
          href: recipe.URL
        }, recipe.name)), createElement("span", {
          className: "icon-text is-size-5 is-pulled-right pr-4 mt-4"
        }), createElement("span", {
          "recipe-id": recipe.id,
          className: "icon"
        }, createElement("i", {
          "recipe-id": recipe.id,
          className: "fas fa-heart",
          onClick: _this.application.handleEventAddRecipeToFavourites
        })), createElement("span", {
          className: "icon-text is-size-5 is-pulled-right pr-4 mt-4"
        }), createElement("span", {
          "recipe-id": recipe.id,
          className: "icon"
        }, createElement("i", {
          "recipe-id": recipe.id,
          className: "fas fa-list",
          onClick: _this.application.handleEventAddRecipeToShoppingList
        }))), createElement("div", {
          className: "card-image has-text-centered"
        }, createElement("img", {
          src: recipe.imageURL,
          alt: recipe.name
        }))));
      };

      _this.divElement.appendChild(recipesSearchElement());

      index++;
    };

    while (index < 4 && index < arrayOfRecipes.length) {
      _loop();
    }

    var displaySearchResults = function displaySearchResults(results) {
      if (results.length === 0) {
        resultsList.textContent = "No recipes found!";
        return;
      }

      for (var i = 0; i < results; i++) {
        var recipeName = results[i].recipeName; // UPDATE KEY to whatever this is

        var recipeImg = results[i].recipeImg; // Update to whatever this is
        // populate recipe name

        var recipeCardTitle = document.querySelector("#results-title-" + i);
        recipeCardTitle.textContent = recipeName;
        recipeCardTitle.setAttribute("href", handleEventShowRecipeDetails(recipeName)); // populate recipe image

        var recipeCardImg = document.querySelector("#results-img-" + i);
        recipeCardImg.src = recipeImg;
        recipeCardImg.setAttribute("href", handleEventShowRecipeDetails(recipeName));
      }
    };
  };

  return RecipeSearchResults;
}();

export { RecipeSearchResults as default };