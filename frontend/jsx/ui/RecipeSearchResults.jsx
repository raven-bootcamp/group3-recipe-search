import logger from "../util/SimpleDebug.js";

export default function RecipeSearchResults(props) {
    let recipes = props.recipes;
    let currentPageNumber = props.currentPageNumber;
    let resultsPerPage = props.resultsPerPage;
    let favouriteHandler = props.favouriteHandler;
    let shoppingListHandler = props.shoppingListHandler;
    let detailsHandler = props.detailsHandler;
    let isFavourite = props.isFavourite;


    // clear the current results list and redraw dynamically
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log("Rendering search results");
    if (logger.isOn() && (100 <= logger.level()) && (100 >= logger.minlevel())) console.log(recipes);


    // how many results to we have
    let numberOfResults = recipes.length;
    // assume 20 results for now

    let startIndex = (currentPageNumber - 1) * resultsPerPage;
    let endIndex = (currentPageNumber * resultsPerPage);

    let index = startIndex;
    // get the subset of recipes for display
    let recipesForDisplay = [];

    while ((index < endIndex) && (index < numberOfResults)) {
        let recipe = recipes[index];
        recipesForDisplay.push(recipe);
        index++;
    }

    const listItems = recipesForDisplay.map((recipe, index) =>
        <div key={index} className="column is-mobile is-3-tablet is-3-desktop mt-4 pl-3 pr-3">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title is-size-6-mobile is-size-5-tablet is-size-4-desktop">
                        <a recipe-id={recipe.id}  className={"truncate-recipe-search"} href="" onClick={detailsHandler}>{recipe.name}</a>
                    </p>
                    <span className="icon-text is-size-5 is-pulled-right pr-3 mt-4">
                        <span recipe-id={recipe.id} className="icon">
                            <i recipe-id={recipe.id} className={(isFavourite(recipe))?"cursor-link fas fa-star":"cursor-link far fa-star"} onClick={favouriteHandler}></i>
                        </span>
                    </span>
                    <span className="icon-text is-size-5 is-pulled-right pr-3 mt-4">
                        <span recipe-id={recipe.id} className="icon">
                            <i recipe-id={recipe.id} className="cursor-link fa fa-cart-plus" onClick={shoppingListHandler}></i>
                        </span>
                    </span>
                </header>
                <div className="card-image has-text-centered">
                    <figure className={"image is-4by3"}>
                    <img className="cursor-link" recipe-id={recipe.id} src={recipe.imageURL}
                         alt={recipe.name} onClick={detailsHandler}/>
                    </figure>
                </div>
            </div>
        </div>
    );

    return (

            <div className="column is-full">
                <div id="search-results" className="columns is-justify-content-space-between">
                    {listItems}
                </div>
            </div>

    );

}