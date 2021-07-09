import logger from "../util/SimpleDebug.js";
export default function RecipeSearchResults(props) {
  var recipes = props.recipes;
  var currentPageNumber = props.currentPageNumber;
  var resultsPerPage = props.resultsPerPage;
  var favouriteHandler = props.favouriteHandler;
  var shoppingListHandler = props.shoppingListHandler;
  var detailsHandler = props.detailsHandler; // clear the current results list and redraw dynamically

  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering search results");
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(recipes); // how many results to we have

  var numberOfResults = recipes.length; // assume 20 results for now

  var startIndex = (currentPageNumber - 1) * resultsPerPage;
  var endIndex = currentPageNumber * resultsPerPage;
  var index = startIndex; // get the subset of recipes for display

  var recipesForDisplay = [];

  while (index < endIndex && index < numberOfResults) {
    var recipe = recipes[index];
    recipesForDisplay.push(recipe);
    index++;
  }

  var listItems = recipesForDisplay.map(function (recipe, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "column is-mobile is-3-tablet is-3-desktop"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("header", {
      className: "card-header"
    }, /*#__PURE__*/React.createElement("p", {
      className: "card-header-title is-size-6"
    }, /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      href: recipe.URL
    }, recipe.name.length > 23 ? recipe.name.substr(0, 19) + "..." : recipe.name)), /*#__PURE__*/React.createElement("span", {
      className: "icon-text is-size-5 is-pulled-right pr-3 mt-4"
    }, /*#__PURE__*/React.createElement("span", {
      "recipe-id": recipe.id,
      className: "icon"
    }, /*#__PURE__*/React.createElement("i", {
      "recipe-id": recipe.id,
      className: "fas fa-star",
      onClick: favouriteHandler
    }))), /*#__PURE__*/React.createElement("span", {
      className: "icon-text is-size-5 is-pulled-right pr-3 mt-4"
    }, /*#__PURE__*/React.createElement("span", {
      "recipe-id": recipe.id,
      className: "icon"
    }, /*#__PURE__*/React.createElement("i", {
      "recipe-id": recipe.id,
      className: "fa fa-cart-plus",
      onClick: shoppingListHandler
    })))), /*#__PURE__*/React.createElement("div", {
      className: "card-image has-text-centered"
    }, /*#__PURE__*/React.createElement("figure", {
      className: "image is-4by3"
    }, /*#__PURE__*/React.createElement("img", {
      className: "recipe-clickable-image",
      "recipe-id": recipe.id,
      src: recipe.imageURL,
      alt: recipe.name,
      onClick: detailsHandler
    })))));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "column is-full"
  }, /*#__PURE__*/React.createElement("div", {
    id: "search-results",
    className: "columns is-justify-content-space-between"
  }, listItems));
}