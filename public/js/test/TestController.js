import Controller from "../Controller.js";
import logger from "../util/SimpleDebug.js";

class TestController {
    constructor(clientSideStorage) {
        this.controller = new Controller(this,clientSideStorage);
    }

    runTests() {
        /* get the current shopping items */
        logger.log("Testing getting current shopping list",1);
        let shoppingList = this.controller.getShoppingList();
        logger.log(shoppingList,1);

        logger.log("Add a recipe to the current shopping list",1);
        let recipe = {
            id: 1,
            name: "Test Recipe",
            imageURL: "image.jpg",
            calories: 1,
            mealType: "Breakfast",
            diet: "Sugar-free",
            ingredients: ["1","2","3"]
        }

        shoppingList = this.controller.addRecipeIngredientsToShoppingList(recipe);
        logger.log(shoppingList,1);

        logger.log("Remove ingredients from the shopping list",1);
        for (let index = 0;index < recipe.ingredients.length;index++) {
            shoppingList = this.controller.removeIngredientFromShoppingList(recipe.ingredients[index]);
            logger.log(shoppingList,1)
        }

        logger.log("Getting favourite recipes",1);
        let favouriteRecipes = this.controller.getFavouriteRecipes();
        logger.log(favouriteRecipes,1);

        logger.log("Adding recipe to favourites",1);
        favouriteRecipes = this.controller.addRecipeToFavouriteRecipes(recipe);
        logger.log(favouriteRecipes);

        logger.log("Remove recipe from favourites by id",1);
        favouriteRecipes = this.controller.removeRecipeFromFavouriteRecipesById(recipe.id);
        logger.log(favouriteRecipes);
    }
}

logger.setOn();
logger.setLevel(100);

let app = new TestController(window.localStorage);
app.runTests();