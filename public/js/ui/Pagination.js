export default function Pagination(props) {
  var recipes = props.recipes; // if we have no recipes then return nothing

  if (recipes === null || recipes.length === 0) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  var currentPageNumber = props.currentPageNumber;
  var totalNumberOfPages = props.totalNumberOfPages;
  var nextHandler = props.nextHandler;
  var previousHandler = props.previousHandler;
  var pageHandler = props.pageHandler; // construct an array for the number of pages

  var pages = [];

  for (var index = 0; index < totalNumberOfPages; index++) {
    pages.push("" + (index + 1));
  }

  var pageButtons = pages.map(function (pageNumber, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("a", {
      "page-number": pageNumber,
      className: currentPageNumber == index + 1 ? "pagination-link is-current" : "pagination-link",
      "aria-label": "Goto page " + pageNumber,
      onClick: pageHandler
    }, pageNumber));
  });
  return /*#__PURE__*/React.createElement("nav", {
    className: "pagination is-rounded is-centered",
    role: "navigation",
    "aria-label": "pagination"
  }, /*#__PURE__*/React.createElement("a", {
    className: "pagination-previous",
    disabled: currentPageNumber == 1,
    onClick: previousHandler
  }, "Previous"), /*#__PURE__*/React.createElement("a", {
    className: "pagination-next",
    disabled: currentPageNumber == totalNumberOfPages,
    onClick: nextHandler
  }, "Next page"), /*#__PURE__*/React.createElement("ul", {
    className: "pagination-list"
  }, pageButtons));
}