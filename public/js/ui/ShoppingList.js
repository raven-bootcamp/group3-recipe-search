import logger from "../util/SimpleDebug.js";
export default function ShoppingList(props) {
  var shoppingList = props.shoppingList;
  var deleteHandler = props.deleteHandler;
  var closeHandler = props.closeHandler;
  var isShowing = props.shouldShow;
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering shopping list");
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(shoppingList);
  var listItems = shoppingList.map(function (ingredient, index) {
    return /*#__PURE__*/React.createElement("button", {
      key: index,
      ingredient: ingredient,
      className: "button is-fullwidth is-info is-outlined is-rounded",
      onClick: deleteHandler
    }, /*#__PURE__*/React.createElement("span", {
      ingredient: ingredient
    }, ingredient), /*#__PURE__*/React.createElement("span", {
      ingredient: ingredient,
      className: "icon is-small"
    }, /*#__PURE__*/React.createElement("i", {
      ingredient: ingredient,
      className: "fas fa-times"
    })));
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "shopping-list",
    className: isShowing ? "modal is-active" : "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card pt-5"
  }, /*#__PURE__*/React.createElement("header", {
    className: "modal-card-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-card-title"
  }, "Shopping List"), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    "aria-label": "close",
    onClick: closeHandler
  })), /*#__PURE__*/React.createElement("section", {
    className: "modal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    id: "shopping-list-content",
    className: "buttons"
  }, listItems)), /*#__PURE__*/React.createElement("footer", {
    className: "modal-card-foot"
  }, /*#__PURE__*/React.createElement("button", {
    id: "close-shopping-list-button",
    className: "button",
    onClick: closeHandler
  }, "Close")))));
}