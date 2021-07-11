import logger from "../util/SimpleDebug.js";

export default function LocationList(props) {

    let locations = props.locations;
    let closeHandler = props.closeHandler;
    let isShowing = props.shouldShow;

    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering location list");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(locations);


    let openGoogleMaps = (event) => {

        let mapsURL = "https://maps.google.com/maps?api=1&&t=&z=13&ie=UTF8&iwloc=&output=embed&q=";
        let lat = event.target.getAttribute("lat");
        let lon = event.target.getAttribute("lon");
        let name= event.target.getAttribute("name");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(event.target);

        mapsURL += lat + "," + lon;
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(location);
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(mapsURL);

        let embeddedMapEl = document.getElementById("map-frame");
        embeddedMapEl.setAttribute("title",name);
        embeddedMapEl.setAttribute("src",mapsURL);
    }

    let listItems = "";

    if (locations.length > 0) {
        listItems = locations.map((location, index) =>
            <a href="#map-frame" key={index} name={location.name} lat={location.lat} lon={location.lon} className="button truncate-location is-fullwidth is-info is-outlined is-rounded " onClick={openGoogleMaps}>
                {location.name + (location.isOpen?"(open now)":"(closed)") + ": " + location.address}
            </a>
        );
    }
    else {
        let dummyArray = [0];
        listItems = dummyArray.map((item, index) =>
            <li key={0} className="button is-fullwidth is-danger is-rounded">
                Please wait, loading nearby supermarkets...
            </li>
        );
    }

    return (
        <div id="location-list" className={isShowing ? "modal is-active" : "modal"}>
            <div className="modal-background">
                <div className="modal-card pt-5">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Nearby Supermarkets</p>
                        <button className="delete" aria-label="close" onClick={closeHandler}></button>
                    </header>
                    <section className="modal-card-body">
                        <ul className="ml-3 mb-3">
                            {listItems}
                        </ul>
                        <iframe width="600" height="500" id="map-frame"
                                src="" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                            title=""
                        </iframe>
                    </section>
                    <footer>
                        <div className="columns is-mobile has-background-light pb-4">
                            <div className={"column is-2 ml-3"}>
                                <button className="button is-rounded modal-close-button" onClick={closeHandler}>Close</button>
                            </div>
                            <div className={"column is-10"}>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}
