import logger from "../util/SimpleDebug.js";

export default function LocationList(props) {

    let locations = props.locations;
    let closeHandler = props.closeHandler;
    let isShowing = props.shouldShow;

    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering location list");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(locations);


    let openGoogleMaps = (event) => {
        let mapsURL = "https://www.google.com/maps/search/?api=1&query=";
        let lat = event.target.getAttribute("lat");
        let lon = event.target.getAttribute("lon");
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(event.target);

        mapsURL += lat + "," + lon;
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(location);
        if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(mapsURL);
        window.open(mapsURL,"_blank");
    }

    let listItems = "";

    if (locations.length > 0) {
        listItems = locations.map((location, index) =>
            <li key={index} lat={location.lat} lon={location.lon} className="button is-fullwidth is-info is-outlined is-rounded" onClick={openGoogleMaps}>
                {location.name + (location.isOpen?"(open now)":"(closed)") + ": " + location.address}
            </li>
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
                        <ul className="ml-3">
                            {listItems}
                        </ul>
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
        </div>
    );
}


