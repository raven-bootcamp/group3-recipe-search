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

  _proto.render = function render(recipe) {
    logger.log("Rendering recipe details", 10);
    logger.log(recipe, 10); // clear the current recipe details and redraw dynamically
    // clear the current shopping list and redraw dynamically

    var element = this.document.getElementById(this.elementId + "-content");
    this.domutil.removeAllChildNodes(element);

    var recipeDetailsElement = function recipeDetailsElement() {
      return createElement("li", null, createElement("button", {
        "recipe-id": recipe.id,
        className: "button is-fullwidth is-info is-outlined is-rounded"
      }, createElement("span", {
        "recipe-id": recipe.id
      }, recipe.name)));
    };

    element.appendChild(recipeDetailsElement());
  };

  _proto.show = function show() {
    logger.log("Showing recipe details", 10);
    this.modalHandler.showModal(this.elementId);
  };

  return RecipeDetails;
}();

export { RecipeDetails as default };