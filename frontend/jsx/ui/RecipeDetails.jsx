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
        <li key={index}><span className={"ml-2"}>{ingredient}</span> </li>
    );

    let mealTypesForDisplay = "";
    recipe.mealType.map((typeText,index) => {
        mealTypesForDisplay += typeText + " ";
    });
    if (mealTypesForDisplay.trim().length > 0) {
        mealTypesForDisplay = "Meal Timing: " + mealTypesForDisplay;
    }
    let dietTypesForDisplay = "";
    recipe.diet.map((typeText,index) => {
        dietTypesForDisplay += typeText + " ";
    });
    if (dietTypesForDisplay.trim().length > 0) {
        dietTypesForDisplay = "Diet Types: " + dietTypesForDisplay;
    }

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
                                 <img src={recipe.imageURL} alt={recipe.name}/>
                            </div>
                            <ol className="pl-3">
                                {listItems}
                            </ol>
                            <div className={"pt-3 pb-3 mt-2 mr-5 has-background-info-dark has-text-white"}>
                                <p className={"ml-3"}>{dietTypesForDisplay}</p>
                                <p className={"ml-3"}>{mealTypesForDisplay}</p>
                            </div>
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-rounded modal-close-button" onClick={closeHandler}>Close
                        </button>
                        <div className="is-pulled-right">
                            <button recipe-id={recipe.id} className="button is-rounded "  onClick={favouriteHandler}>
                                <span recipe-id={recipe.id} className="icon">
                                  <i recipe-id={recipe.id} className="fas fa-star"></i>
                                </span>
                            </button>
                            <button recipe-id={recipe.id} className="button is-rounded "  onClick={shoppingListHandler}>
                                <span recipe-id={recipe.id} className="icon">
                                  <i recipe-id={recipe.id} className="fa fa-cart-plus"></i>
                                </span>
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}