/** @jsx createElement */

/*** @jsxFrag createFragment */
import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";
import { createFragment, createElement } from "../util/ui/JsxProcessor.js";
import modalHandler from "../util/ui/ModalHandler.js";

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

    logger.log("Rendering shopping list", 10);
    logger.log(shoppingList, 10); // clear the current shopping list and redraw dynamically

    var element = this.document.getElementById(this.elementId + "-content");
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
    this.modalHandler.showModal(this.elementId);
  };

  return ShoppingList;
}();

export { ShoppingList as default };