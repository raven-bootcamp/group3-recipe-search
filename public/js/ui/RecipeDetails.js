import logger from "../util/SimpleDebug.js";
export default function RecipeDetails(props) {
  var recipe = props.recipe; // if we don't have a selected recipe render nothing

  if (recipe === null) {
    return /*#__PURE__*/React.createElement("div", {
      id: "recipe-details",
      className: "modal"
    });
  }

  var closeHandler = props.closeHandler;
  var favouriteHandler = props.favouriteHandler;
  var shoppingListHandler = props.shoppingListHandler;
  var isShowing = props.shouldShow;
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering recipe details");
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(recipe);
  var listItems = recipe.ingredients.map(function (ingredient, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, ingredient);
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "recipe-details",
    className: isShowing ? "modal is-active" : "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card pt-5"
  }, /*#__PURE__*/React.createElement("header", {
    className: "modal-card-head"
  }, /*#__PURE__*/React.createElement("p", {
    id: "recipe-details-title",
    className: "modal-card-title"
  }, /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: recipe.URL
  }, recipe.name)), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    "aria-label": "close",
    onClick: closeHandler
  })), /*#__PURE__*/React.createElement("section", {
    className: "modal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "recipe-details-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "recipe-image has-text-centered"
  }, /*#__PURE__*/React.createElement("img", {
    id: "recipe-details-img",
    src: recipe.imageURL,
    alt: recipe.name
  })), /*#__PURE__*/React.createElement("ul", {
    id: "recipe-details-content"
  }, listItems), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    id: "recipe-details-dietary"
  }, recipe.diet), /*#__PURE__*/React.createElement("p", {
    id: "recipe-details-mealType"
  }, recipe.mealType)))), /*#__PURE__*/React.createElement("footer", {
    className: "modal-card-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button modal-close-button",
    onClick: closeHandler
  }, "Close"), /*#__PURE__*/React.createElement("div", {
    className: "is-pulled-right"
  }, /*#__PURE__*/React.createElement("a", {
    "recipe-id": recipe.id,
    className: "modal-shopping-item is-pulled-right",
    id: "ingredient-add-btn",
    onClick: shoppingListHandler
  }, /*#__PURE__*/React.createElement("i", {
    "recipe-id": recipe.id,
    className: "fas fa-shopping-cart"
  })), /*#__PURE__*/React.createElement("a", {
    "recipe-id": recipe.id,
    className: "modal-fav-item is-pulled-right",
    id: "recipe-favourite-btn",
    onClick: favouriteHandler
  }, /*#__PURE__*/React.createElement("i", {
    "recipe-id": recipe.id,
    className: "fas fa-star"
  })))))));
}