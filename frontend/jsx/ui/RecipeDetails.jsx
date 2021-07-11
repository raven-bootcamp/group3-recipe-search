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
    let isFavourite = props.isFavourite;

    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering recipe details");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(recipe);

    const listItems = recipe.ingredients.map((ingredient, index) =>
        <li key={index}><span className={"ml-2"}>{ingredient}</span> </li>
    );

    let hashTagsForDisplay = "";
    recipe.mealType.map((typeText,index) => {
        hashTagsForDisplay += "#" + typeText + " ";
    });

    recipe.diet.map((typeText,index) => {
        hashTagsForDisplay += "#" + typeText + " ";
    });

    hashTagsForDisplay = hashTagsForDisplay.toLowerCase();

    let goToExternalPage = function(event) {
        window.open(recipe.URL,"_blank");
    }


    return (
        <div id="recipe-details" className={isShowing ? "modal is-active" : "modal"}>
            <div className="modal-background">
                <div className="modal-card pt-5">
                    <header className="modal-card-head">
                        <p id="recipe-details-title" className="modal-card-title">
                            <a target="_blank" href={recipe.URL}>
                                <span className={"truncate-recipe-details has-text-info-dark"}>{recipe.name}</span>
                            </a>
                        </p>
                        <p className={"is-pulled-right p-1 has-text-info-dark"}>
                            <i className="cursor-link fas fa-share-square" onClick={goToExternalPage}></i>
                        </p>
                        <button className="delete" aria-label="close" onClick={closeHandler}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="recipe-details-content">
                            <div className="recipe-image has-text-centered">
                                <img src={recipe.imageURL} alt={recipe.name}/>
                            </div>
                            <ol className="pl-3">
                                {listItems}
                            </ol>
                            <div className={"pt-3 pb-3 mt-2 has-text-info-dark"}>
                                <p className={"ml-3"}>{hashTagsForDisplay}</p>
                            </div>
                        </div>

                    </section>
                    <footer>
                        <div className="columns is-mobile has-background-light pb-4">
                            <div className={"column is-2 ml-3"}>
                                <button className="button is-rounded modal-close-button" onClick={closeHandler}>Close</button>
                            </div>
                            <div className={"column is-5-mobile is-7-tablet"}></div>
                            <div className={"column is-1"}>
                              <span recipe-id={recipe.id} className="icon is-large">
                                <i recipe-id={recipe.id} className={(isFavourite(recipe))?"cursor-link fas fa-star":"cursor-link far fa-star"} onClick={favouriteHandler}></i>
                              </span>
                            </div>
                            <div className={"column is-1"}>
                                <span recipe-id={recipe.id} className="icon is-large">
                                    <i recipe-id={recipe.id} className="cursor-link fa fa-cart-plus" onClick={shoppingListHandler}></i>
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}