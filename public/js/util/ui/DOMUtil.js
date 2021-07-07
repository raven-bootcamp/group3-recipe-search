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


}