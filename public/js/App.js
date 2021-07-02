import logger from './util/SimpleDebug.js'
import Controller from "./Controller.js";

class App {
    constructor() {
        logger.setOn();
        logger.setLevel(100);
        this.controller = new Controller(this,window.localStorage);
    }
}

let app = new App();
/* test API call */
app.controller.__testAPICall();

