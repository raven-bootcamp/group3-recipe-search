import logger from "../SimpleDebug.js";

export default class ModalHandler {
    constructor(document,showModalClassName) {
        this.document = document;
        this.showModalClassName = showModalClassName;
        this.modals = [];
        this.hideModal = this.hideModal.bind(this);
    }

    addNewModal(modalDOMElementId) {
        if (logger.isOn() && (600 <= logger.level()) && (600 >= logger.minlevel())) console.log("Add new modal " + modalDOMElementId);
        let modalDOMElement = this.document.getElementById(modalDOMElementId);
        if (logger.isOn() && (600 <= logger.level()) && (600 >= logger.minlevel())) console.log(modalDOMElement);
        this.modals.push({id: modalDOMElementId, element: modalDOMElement});
        // register for the close button events
        if (logger.isOn() && (600 <= logger.level()) && (600 >= logger.minlevel())) console.log("Add new modal " + modalDOMElementId + " close button event handler");
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
        if (logger.isOn() && (600 <= logger.level()) && (600 >= logger.minlevel())) console.log("Showing modal " + modalDOMElementId);
        let foundIndex = this.modals.findIndex((nvp,index) => nvp.id === modalDOMElementId);
        if (foundIndex >= 0) {
            let nameValuePair = this.modals[foundIndex];
            nameValuePair.element.classList.add(this.showModalClassName);
        }
    }

    hideModal(event) {
        if (logger.isOn() && (600 <= logger.level()) && (600 >= logger.minlevel())) console.log("Hiding modal windows");
        this.__closeAllModals();
    }
}
