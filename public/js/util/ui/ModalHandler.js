import logger from "../SimpleDebug.js";

export default class ModalHandler {
    constructor(document,showModalClassName) {
        this.document = document;
        this.showModalClassName = showModalClassName;
        this.modals = [];
        this.hideModal = this.hideModal.bind(this);
    }

    addNewModal(modalDOMElementId) {
        logger.log("Add new modal " + modalDOMElementId,300);
        let modalDOMElement = this.document.getElementById(modalDOMElementId);
        logger.log(modalDOMElement,301);
        this.modals.push({id: modalDOMElementId, element: modalDOMElement});
        // register for the close button events
        logger.log("Add new modal " + modalDOMElementId + " close button event handler",300);
        let closeButtons = modalDOMElement.querySelectorAll(".modal-close-button");
        for (let index = 0;index < closeButtons.length;index++) {
            let closeButtonEl = closeButtons[index];
            logger.log(closeButtonEl,301);
            closeButtonEl.addEventListener("click",this.hideModal);
        }
    }

    __closeAllModals() {
        for (let index = 0;index < this.modals.length;index++) {
            let nameValuePair = this.modals[index];
            nameValuePair.element.classList.remove(this.showModalClassName);
        }
    }

    showModal(modalDOMElementId) {
        logger.log("Showing modal " + modalDOMElementId,300);
        let foundIndex = this.modals.findIndex((nvp,index) => nvp.id === modalDOMElementId);
        if (foundIndex >= 0) {
            let nameValuePair = this.modals[foundIndex];
            nameValuePair.element.classList.add(this.showModalClassName);
        }
    }

    hideModal(event) {
        logger.log("Hiding modal window ",300);
        this.__closeAllModals();
    }
}
