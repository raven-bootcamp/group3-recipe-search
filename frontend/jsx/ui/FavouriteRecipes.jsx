import logger from "../util/SimpleDebug.js";


export default function FavouriteRecipes(props) {
    let favouriteRecipes = props.favouriteRecipes;
    let deleteHandler = props.deleteHandler;
    let closeHandler = props.closeHandler;
    let detailsHandler = props.detailsHandler;
    let isShowing = props.shouldShow;

    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering favourite recipe list");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(favouriteRecipes);

    const listItems = favouriteRecipes.map((recipe, index) =>
        <li className={"pt-1 pb-1"} key={index}>
            <button recipe-id={recipe.id} className="button is-info is-outlined is-rounded" onClick={detailsHandler}>
                <span className={"truncate-favourite-recipe"} recipe-id={recipe.id}>{recipe.name}</span>
            </button>
            <button recipe-id={recipe.id} className="delete mt-3 ml-2" onClick={deleteHandler}>
                <span recipe-id={recipe.id} className="icon is-large">
                    <i recipe-id={recipe.id} className="fas fa-times"></i>
                </span>
            </button>
        </li>
    );

    return (
        <div id="favourite-recipes" className={isShowing ? "modal is-active" : "modal"}>
            <div className="modal-background">
                <div className="modal-card pt-5">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Favourite Recipes</p>
                        <button className="delete" aria-label="close" onClick={closeHandler}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="favourite-recipes-content">
                            <ul id="favourite-recipes-content">
                                {listItems}
                            </ul>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-rounded" onClick={closeHandler}>Close</button>
                    </footer>
                </div>
            </div>
        </div>
    );

}