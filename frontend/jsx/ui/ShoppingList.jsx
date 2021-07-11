import logger from "../util/SimpleDebug.js";

export default function ShoppingList(props) {

    let shoppingList = props.shoppingList;
    let deleteHandler = props.deleteHandler;
    let closeHandler = props.closeHandler;
    let clearListHandler = props.clearListHandler;
    let locationHandler = props.locationHandler;
    let isShowing = props.shouldShow;

    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering shopping list");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(shoppingList);

    const listItems = shoppingList.map((ingredient, index) =>
        <button key={index} ingredient={ingredient} className="button is-fullwidth is-info is-outlined is-rounded"
                onClick={deleteHandler}>
            <span className="truncate-shopping-list" ingredient={ingredient}>{ingredient}</span>
            <span ingredient={ingredient} className="icon is-small">
                    <i ingredient={ingredient} className="fas fa-times"></i>
                </span>
        </button>
    );

    return (
        <div id="shopping-list" className={isShowing ? "modal is-active" : "modal"}>
            <div className="modal-background">
                <div className="modal-card pt-5">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Shopping List</p>
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
                            <div className={"column is-2 ml-3"}>
                                <button className="button is-rounded is-danger modal-close-button" onClick={clearListHandler}>Clear List</button>
                            </div>
                            <div className={"column is-offset-5 is-1"}>
                                <button className="button is-rounded"  onClick={locationHandler}>
                                    <span className="icon">
                                        <i className="fas fa-search-location"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}


