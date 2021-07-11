import logger from "../util/SimpleDebug.js";
export default function FavouriteRecipes(props) {
  var favouriteRecipes = props.favouriteRecipes;
  var deleteHandler = props.deleteHandler;
  var closeHandler = props.closeHandler;
  var detailsHandler = props.detailsHandler;
  var isShowing = props.shouldShow;
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering favourite recipe list");
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(favouriteRecipes);
  var listItems = favouriteRecipes.map(function (recipe, index) {
    return /*#__PURE__*/React.createElement("li", {
      className: "pt-1 pb-1",
      key: index
    }, /*#__PURE__*/React.createElement("button", {
      "recipe-id": recipe.id,
      className: "button is-info is-outlined is-rounded",
      onClick: detailsHandler
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate-favourite-recipe",
      "recipe-id": recipe.id
    }, recipe.name)), /*#__PURE__*/React.createElement("button", {
      "recipe-id": recipe.id,
      className: "delete mt-3 ml-2",
      onClick: deleteHandler
    }, /*#__PURE__*/React.createElement("span", {
      "recipe-id": recipe.id,
      className: "icon is-large"
    }, /*#__PURE__*/React.createElement("i", {
      "recipe-id": recipe.id,
      className: "fas fa-times"
    }))));
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "favourite-recipes",
    className: isShowing ? "modal is-active" : "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card pt-5"
  }, /*#__PURE__*/React.createElement("header", {
    className: "modal-card-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-card-title"
  }, "Favourite Recipes"), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    "aria-label": "close",
    onClick: closeHandler
  })), /*#__PURE__*/React.createElement("section", {
    className: "modal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "favourite-recipes-content"
  }, /*#__PURE__*/React.createElement("ul", {
    id: "favourite-recipes-content"
  }, listItems))), /*#__PURE__*/React.createElement("footer", {
    className: "modal-card-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button is-rounded",
    onClick: closeHandler
  }, "Close")))));
}