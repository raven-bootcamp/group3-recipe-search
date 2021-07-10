import logger from "../util/SimpleDebug.js";

export default function LocationList(props) {

    let locations = props.locations;
    let closeHandler = props.closeHandler;
    let isShowing = props.shouldShow;

    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering location list");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(locations);



    let listItems = "Please wait, loading nearby supermarkets...";

    if (locations.length > 0) {
        listItems = locations.map((location, index) =>
            <li key={index} className="button is-fullwidth is-info is-outlined is-rounded">
                {location.name + (location.isOpen?"(open now)":"(closed)") + ": " + location.address}
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
                        <div className="buttons">
                            {listItems}
                        </div>
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


