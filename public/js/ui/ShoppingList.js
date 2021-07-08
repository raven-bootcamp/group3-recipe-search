/** @jsx createElement */

/*** @jsxFrag createFragment */
import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import { createElement } from "../util/ui/JsxProcessor.js";

var ShoppingList = /*#__PURE__*/function () {
  function ShoppingList(application, document, modalHandler) {
    this.application = application;
    this.document = document;
    this.modalHandler = modalHandler;
    this.elementId = "shopping-list";
    this.domutil = new DOMUtil(document);
    this.modalHandler.addNewModal(this.elementId);
  }

  var _proto = ShoppingList.prototype;

  _proto.render = function render(shoppingList) {
    var _this = this;

    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering shopping list");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(shoppingList); // clear the current shopping list and redraw dynamically

    var element = this.document.getElementById(this.elementId + "-content");
    this.domutil.removeAllChildNodes(element);

    var _loop = function _loop(index) {
      var ingredient = shoppingList[index];

      var shoppingListElement = function shoppingListElement() {
        return createElement("button", {
          ingredient: ingredient,
          class: "button is-fullwidth is-info is-outlined is-rounded",
          onClick: _this.application.handleEventRemoveIngredientFromShoppingList
        }, createElement("span", {
          ingredient: ingredient
        }, ingredient), createElement("span", {
          ingredient: ingredient,
          class: "icon is-small"
        }, createElement("i", {
          ingredient: ingredient,
          class: "fas fa-times"
        })));
      };

      element.appendChild(shoppingListElement());
    };

    for (var index = 0; index < shoppingList.length; index++) {
      _loop(index);
    }
  };

  _proto.show = function show() {
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Showing shopping list");
    this.modalHandler.showModal(this.elementId);
  };

  return ShoppingList;
}();

export { ShoppingList as default };