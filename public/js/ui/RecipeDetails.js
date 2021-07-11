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
  var isFavourite = props.isFavourite;
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering recipe details");
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(recipe);
  var listItems = recipe.ingredients.map(function (ingredient, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("span", {
      className: "ml-2"
    }, ingredient), " ");
  });
  var hashTagsForDisplay = "";
  recipe.mealType.map(function (typeText, index) {
    hashTagsForDisplay += "#" + typeText + " ";
  });
  recipe.diet.map(function (typeText, index) {
    hashTagsForDisplay += "#" + typeText + " ";
  });

  var goToExternalPage = function goToExternalPage(event) {
    window.open(recipe.URL, "_blank");
  };

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
    className: "has-text-info-dark truncate-recipe-details",
    target: "_blank",
    href: recipe.URL
  }, recipe.name)), /*#__PURE__*/React.createElement("p", {
    className: "is-pulled-right p-1 has-text-info-dark"
  }, /*#__PURE__*/React.createElement("i", {
    className: "cursor-link fas fa-share-square",
    onClick: goToExternalPage
  })), /*#__PURE__*/React.createElement("button", {
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
    className: "pt-3 pb-3 mt-2 has-text-info-dark"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ml-3"
  }, hashTagsForDisplay)))), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "columns is-mobile has-background-light pb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column is-2 ml-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button is-rounded modal-close-button",
    onClick: closeHandler
  }, "Close")), /*#__PURE__*/React.createElement("div", {
    className: "column is-offset-7 is-1"
  }, /*#__PURE__*/React.createElement("span", {
    "recipe-id": recipe.id,
    className: "icon is-large"
  }, /*#__PURE__*/React.createElement("i", {
    "recipe-id": recipe.id,
    className: isFavourite(recipe) ? "cursor-link fas fa-star" : "cursor-link far fa-star",
    onClick: favouriteHandler
  }))), /*#__PURE__*/React.createElement("div", {
    className: "column is-1"
  }, /*#__PURE__*/React.createElement("span", {
    "recipe-id": recipe.id,
    className: "icon is-large"
  }, /*#__PURE__*/React.createElement("i", {
    "recipe-id": recipe.id,
    className: "cursor-link fa fa-cart-plus",
    onClick: shoppingListHandler
  }))))))));
}