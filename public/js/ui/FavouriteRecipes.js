import logger from "../util/SimpleDebug.js";
import DOMUtil from "../util/ui/DOMUtil.js";

export default class FavouriteRecipes {
    constructor(application,document) {
        this.document = document;
        this.application = application;
        this.domutil = new DOMUtil(document);
        this.hide = this.hide.bind(this);

        let closeButtonEl = this.document.getElementById("close-favourite-recipes-delete-button");
        closeButtonEl.addEventListener("click",this.hide);
        closeButtonEl = this.document.getElementById("close-favourite-recipes-button");
        closeButtonEl.addEventListener("click",this.hide);
    }

    render(arrayOfFavouriteRecipes) {
        logger.log("Rendering favourite recipes",10);
        logger.log(arrayOfFavouriteRecipes,10);
        // clear the current favourite recipe list and redraw dynamically
        let element = this.document.getElementById("favourite-recipes-content");
        this.domutil.removeAllChildNodes(element);
        // add the ingredients as buttons under list items
        for (let index = 0;index < arrayOfFavouriteRecipes.length;index++) {

        }
    }

    show() {
        logger.log("Showing favourite recipes",10);
        let element = this.document.getElementById("favourite-recipes");
        element.classList.add("is-active");
    }

    hide(event) {
        logger.log("Hiding favourite recipes",10);
        let element = this.document.getElementById("favourite-recipes");
        element.classList.remove("is-active");
    }
}