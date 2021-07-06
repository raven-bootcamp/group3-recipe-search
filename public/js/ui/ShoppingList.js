import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js"; //import dom from "jsx-render";

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
    var shoppingListItems = shoppingList.map(function (item, index) {
      return dom("li", null, dom("button", {
        className: "button is-rounded is-success",
        onClick: _this.application.handleEventRemoveIngredientFromShoppingList
      }, dom("span", null, item), dom("span", {
        className: "icon is-small"
      }, dom("i", {
        className: "fas fa-times"
      }))));
    });
    element.appendChild(dom("shoppingListItems", null));
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