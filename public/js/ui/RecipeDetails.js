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
    }, /*#__PURE__*/React.createElement("span", {
      className: "ml-2"
    }, ingredient), " ");
  });
  var mealTypesForDisplay = "";
  recipe.mealType.map(function (typeText, index) {
    mealTypesForDisplay += typeText + " ";
  });

  if (mealTypesForDisplay.trim().length > 0) {
    mealTypesForDisplay = "Meal Timing: " + mealTypesForDisplay;
  }

  var dietTypesForDisplay = "";
  recipe.diet.map(function (typeText, index) {
    dietTypesForDisplay += typeText + " ";
  });

  if (dietTypesForDisplay.trim().length > 0) {
    dietTypesForDisplay = "Diet Types: " + dietTypesForDisplay;
  }

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
    src: recipe.imageURL,
    alt: recipe.name
  })), /*#__PURE__*/React.createElement("ol", {
    className: "pl-3"
  }, listItems), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 pb-3 mt-2 mr-5 has-background-info-dark has-text-white"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ml-3"
  }, dietTypesForDisplay), /*#__PURE__*/React.createElement("p", {
    className: "ml-3"
  }, mealTypesForDisplay)))), /*#__PURE__*/React.createElement("footer", {
    className: "modal-card-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button is-rounded modal-close-button",
    onClick: closeHandler
  }, "Close"), /*#__PURE__*/React.createElement("div", {
    className: "is-pulled-right"
  }, /*#__PURE__*/React.createElement("button", {
    "recipe-id": recipe.id,
    className: "button is-rounded ",
    onClick: favouriteHandler
  }, /*#__PURE__*/React.createElement("span", {
    "recipe-id": recipe.id,
    className: "icon"
  }, /*#__PURE__*/React.createElement("i", {
    "recipe-id": recipe.id,
    className: "fas fa-star"
  }))), /*#__PURE__*/React.createElement("button", {
    "recipe-id": recipe.id,
    className: "button is-rounded ",
    onClick: shoppingListHandler
  }, /*#__PURE__*/React.createElement("span", {
    "recipe-id": recipe.id,
    className: "icon"
  }, /*#__PURE__*/React.createElement("i", {
    "recipe-id": recipe.id,
    className: "fa fa-cart-plus"
  }))))))));
}