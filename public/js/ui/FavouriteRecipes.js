/** @jsx createElement */

/*** @jsxFrag createFragment */
import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import { createFragment, createElement } from "../util/ui/JsxProcessor.js";
import modalHandler from "../util/ui/ModalHandler.js";

var FavouriteRecipes = /*#__PURE__*/function () {
  function FavouriteRecipes(application, document, modalHandler) {
    this.application = application;
    this.document = document;
    this.modalHandler = modalHandler;
    this.elementId = "favourite-recipes";
    this.domutil = new DOMUtil(document);
    this.modalHandler.addNewModal(this.elementId);
  }

  var _proto = FavouriteRecipes.prototype;

  _proto.render = function render(arrayOfFavouriteRecipes) {
    var _this = this;

    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering favourite recipe list");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(arrayOfFavouriteRecipes); // clear the current shopping list and redraw dynamically

    var element = this.document.getElementById(this.elementId + "-content");
    this.domutil.removeAllChildNodes(element);

    var _loop = function _loop(index) {
      var recipe = arrayOfFavouriteRecipes[index];
      if (recipe == null) return "break";

      var recipesListElement = function recipesListElement() {
        return createElement("li", null, createElement("button", {
          "recipe-id": recipe.id,
          class: "button     is-info is-outlined is-rounded",
          onClick: _this.application.handleEventShowRecipeDetailsFromFavourites
        }, createElement("span", {
          "recipe-id": recipe.id
        }, recipe.name)), createElement("button", {
          "recipe-id": recipe.id,
          class: "delete mt-3 ml-2",
          onClick: _this.application.handleEventRemoveRecipeFromFavourites
        }, createElement("span", {
          "recipe-id": recipe.id,
          className: "icon is-large"
        }, createElement("i", {
          "recipe-id": recipe.id,
          className: "fas fa-times"
        }))));
      };

      element.appendChild(recipesListElement());
    };

    for (var index = 0; index < arrayOfFavouriteRecipes.length; index++) {
      var _ret = _loop(index);

      if (_ret === "break") break;
    }
  };

  _proto.show = function show() {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Showing favourite recipes");
    this.modalHandler.showModal(this.elementId);
  };

  return FavouriteRecipes;
}();

export { FavouriteRecipes as default };