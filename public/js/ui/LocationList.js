import logger from "../util/SimpleDebug.js";
export default function LocationList(props) {
  var locations = props.locations;
  var closeHandler = props.closeHandler;
  var isShowing = props.shouldShow;
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log("Rendering location list");
  if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(locations);

  var openGoogleMaps = function openGoogleMaps(event) {
    var mapsURL = "https://maps.google.com/maps?api=1&&t=&z=13&ie=UTF8&iwloc=&output=embed&q=";
    var lat = event.target.getAttribute("lat");
    var lon = event.target.getAttribute("lon");
    var name = event.target.getAttribute("name");
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(event.target);
    mapsURL += lat + "," + lon;
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(location);
    if (logger.isOn() && 100 <= logger.level() && 100 >= logger.minlevel()) console.log(mapsURL);
    var embeddedMapEl = document.getElementById("map-frame");
    embeddedMapEl.setAttribute("title", name);
    embeddedMapEl.setAttribute("src", mapsURL);
  };

  var listItems = "";

  if (locations.length > 0) {
    listItems = locations.map(function (location, index) {
      return /*#__PURE__*/React.createElement("a", {
        href: "#map-frame",
        key: index,
        name: location.name,
        lat: location.lat,
        lon: location.lon,
        className: "button truncate-location is-fullwidth is-info is-outlined is-rounded ",
        onClick: openGoogleMaps
      }, location.name + (location.isOpen ? "(open now)" : "(closed)") + ": " + location.address);
    });
  } else {
    var dummyArray = [0];
    listItems = dummyArray.map(function (item, index) {
      return /*#__PURE__*/React.createElement("li", {
        key: 0,
        className: "button is-fullwidth is-danger is-rounded"
      }, "Please wait, loading nearby supermarkets...");
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
  }, /*#__PURE__*/React.createElement("ul", {
    className: "ml-3 mb-3"
  }, listItems), /*#__PURE__*/React.createElement("iframe", {
    width: "600",
    height: "500",
    id: "map-frame",
    src: "",
    frameBorder: "0",
    scrolling: "no",
    marginHeight: "0",
    marginWidth: "0"
  }, "title=\"\"")), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "columns is-mobile has-background-light pb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column is-2 ml-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button is-rounded modal-close-button",
    onClick: closeHandler
  }, "Close")), /*#__PURE__*/React.createElement("div", {
    className: "column is-10"
  }))))), /*#__PURE__*/React.createElement("div", null));
}