/** @jsx createElement */

/*** @jsxFrag createFragment */
import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import { createFragment, createElement } from "../util/ui/JsxProcessor.js";

var ShoppingList = /*#__PURE__*/function () {
  function ShoppingList(application, document) {
    this.document = document;
    this.application = application;
    this.domutil = new DOMUtil(document);
    this.hide = this.hide.bind(this);
    var closeButtonEl = this.document.getElementById("close-shopping-list-delete-button");
    closeButtonEl.addEventListener("click", this.hide);
    closeButtonEl = this.document.getElementById("close-shopping-list-button");
    closeButtonEl.addEventListener("click", this.hide);
  }

  var _proto = ShoppingList.prototype;

  _proto.render = function render(shoppingList) {
    var _this = this;

    logger.log("Rendering shopping list", 10);
    logger.log(shoppingList, 10); // clear the current shopping list and redraw dynamically

    var element = this.document.getElementById("shopping-list-content");
    this.domutil.removeAllChildNodes(element);

    var _loop = function _loop(index) {
      var shoppingListElement = function shoppingListElement() {
        return createElement("button", {
          class: "button is-fullwidth is-info is-outlined is-rounded",
          onClick: _this.application.handleEventRemoveIngredientFromShoppingList
        }, createElement("span", null, shoppingList[index]), createElement("span", {
          class: "icon is-small"
        }, createElement("i", {
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
    logger.log("Showing shopping list", 10);
    var element = this.document.getElementById("shopping-list");
    element.classList.add("is-active");
  };

  _proto.hide = function hide(event) {
    logger.log("Hiding shopping list", 10);
    var element = this.document.getElementById("shopping-list");
    element.classList.remove("is-active");
  };

  return ShoppingList;
}();

export { ShoppingList as default };