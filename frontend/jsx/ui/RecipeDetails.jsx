import logger from "../util/SimpleDebug.js";


export default function RecipeDetails(props) {
    let recipe = props.recipe;
    // if we don't have a selected recipe render nothing
    if (recipe === null) {
        return (
            <div id="recipe-details" className="modal">
            </div>
        );
    }


    let closeHandler = props.closeHandler;
    let favouriteHandler = props.favouriteHandler;
    let shoppingListHandler = props.shoppingListHandler;
    let isShowing = props.shouldShow;

    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering recipe details");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(recipe);

    const listItems = recipe.ingredients.map((ingredient, index) =>
        <li key={index}>{ingredient}</li>
    );

    return (
        <div id="recipe-details" className={isShowing ? "modal is-active" : "modal"}>
            <div className="modal-background">
                <div className="modal-card pt-5">
                    <header className="modal-card-head">
                        <p id="recipe-details-title" className="modal-card-title"><a target="_blank"
                                                                                     href={recipe.URL}>{recipe.name}</a>
                        </p>
                        <button className="delete" aria-label="close" onClick={closeHandler}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="recipe-details-content">
                            <div className="recipe-image has-text-centered">
                                <img id="recipe-details-img" src={recipe.imageURL} alt={recipe.name}/>
                            </div>
                            <ul id="recipe-details-content">
                                {listItems}
                            </ul>
                            <div>
                                <p id="recipe-details-dietary">{recipe.diet}</p>
                                <p id="recipe-details-mealType">{recipe.mealType}</p>
                            </div>
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button modal-close-button" onClick={closeHandler}>Close
                        </button>
                        <div className="is-pulled-right">
                            <a recipe-id={recipe.id} className="modal-shopping-item is-pulled-right"
                               id="ingredient-add-btn" onClick={shoppingListHandler}>
                                <i recipe-id={recipe.id} className="fa fa-cart-plus"></i>
                            </a>
                            <a recipe-id={recipe.id} className="modal-fav-item is-pulled-right"
                               id="recipe-favourite-btn" onClick={favouriteHandler}>
                                <i recipe-id={recipe.id} className="fas fa-star"></i>
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}