import logger from "../util/SimpleDebug.js";

export default function RecipeSearchResults(props) {
    let recipes = props.recipes;
    let currentPageNumber = props.currentPageNumber;
    let resultsPerPage = props.resultsPerPage;
    let favouriteHandler = props.favouriteHandler;
    let shoppingListHandler = props.shoppingListHandler;
    let detailsHandler = props.detailsHandler;


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
        <div key={index} className="column is-mobile is-3-tablet is-3-desktop">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title is-size-5">
                        <a target="_blank" href={recipe.URL}>{recipe.name}</a>
                    </p>
                    <span className="icon-text is-size-5 is-pulled-right pr-4 mt-4">
                        <span recipe-id={recipe.id} className="icon">
                            <i recipe-id={recipe.id} className="fas fa-star" onClick={favouriteHandler}></i>
                        </span>
                    </span>
                    <span className="icon-text is-size-5 is-pulled-right pr-4 mt-4">
                        <span recipe-id={recipe.id} className="icon">
                            <i recipe-id={recipe.id} className="fas fa-shopping-cart" onClick={shoppingListHandler}></i>
                        </span>
                    </span>
                </header>
                <div className="card-image has-text-centered">
                    <img className="recipe-clickable-image" recipe-id={recipe.id} src={recipe.imageURL}
                         alt={recipe.name} onClick={detailsHandler}/>
                </div>
            </div>
        </div>
    );

    return (
        <section className="results_section">
            <div className="container">
                <div id="search-results" className="columns is-justify-content-space-between">
                    {listItems}
                </div>
            </div>
        </section>
    );

}