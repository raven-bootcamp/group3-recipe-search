import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";

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
    logger.log("Rendering shopping list", 10);
    logger.log(shoppingList, 10); // clear the current shopping list and redraw dynamically

    var element = this.document.getElementById("shopping-list-content");
    this.domutil.removeAllChildNodes(element); // add the ingredients as buttons under list items

    for (var index = 0; index < shoppingList.length; index++) {
      var buttonEl = this.domutil.addDeleteButtonAsListItemOfParent(shoppingList[index], element);
      buttonEl.addEventListener("click", this.application.handleEventRemoveIngredientFromShoppingList);
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