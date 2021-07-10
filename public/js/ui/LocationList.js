import logger from "../util/SimpleDebug.js";
export default function LocationList(props) {
  var locations = props.locations;
  var closeHandler = props.closeHandler;
  var isShowing = props.shouldShow;
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering location list");
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(locations);
  var listItems = "Please wait, loading nearby supermarkets...";

  if (locations.length > 0) {
    listItems = locations.map(function (location, index) {
      return /*#__PURE__*/React.createElement("li", {
        key: index,
        className: "button is-fullwidth is-info is-outlined is-rounded"
      }, location.name + (location.isOpen ? "(open now)" : "(closed)") + ": " + location.address);
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    id: "location-list",
    className: isShowing ? "modal is-active" : "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-background"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card pt-5"
  }, /*#__PURE__*/React.createElement("header", {
    className: "modal-card-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "modal-card-title"
  }, "Nearby Supermarkets"), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    "aria-label": "close",
    onClick: closeHandler
  })), /*#__PURE__*/React.createElement("section", {
    className: "modal-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "buttons"
  }, listItems)), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "columns is-mobile has-background-light pb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column is-2 ml-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button is-rounded modal-close-button",
    onClick: closeHandler
  }, "Close")), /*#__PURE__*/React.createElement("div", {
    className: "column is-10"
  }))))));
}