import logger from "../SimpleDebug.js";

export default class DOMUtil {

    constructor(document) {
        this.document = document;
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    addChildNodeOfTypeToParent(type,parent) {
        let childNode = this.document.createElement(type);
        parent.appendChild(childNode);
        return childNode;
    }

    addChildNodeOfTypeAsListItemsOfParent(type,parent) {
        let listItemEl = this.document.createElement("li");
        parent.appendChild(listItemEl);
        return this.addChildNodeOfTypeToParent(type,listItemEl);

    }

    bulmaCreateDeleteButtonWithText(text) {
        /*
          <button class="button is-rounded is-success">
            <span>Text</span>
            <span class="icon is-small">
              <i class="fas fa-times"></i>
            </span>
          </button>
         */
        let buttonElement = this.document.createElement("button");
        buttonElement.classList.add("is-rounded","is-success");
        buttonElement.innerHTML = "<span>" + text +
            "</span><span class='icon is-small'><i class='fas fa-times'></i> </span>";
        return buttonElement;
    }

    addDeleteButtonAsListItemOfParent(buttonText,parent) {
        let listItemEl = this.document.createElement("li");
        parent.appendChild(listItemEl);
        let buttonEl = this.bulmaCreateDeleteButtonWithText(buttonText);
        listItemEl.appendChild(buttonEl);
        return buttonEl;

    }
}