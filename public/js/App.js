import logger from './util/SimpleDebug.js'
import Controller from "./Controller.js";

class App {
    constructor() {
        this.controller = new Controller(document,window.localStorage);
    }
}
/* turn on console messages for development*/
logger.setOn();
logger.setLevel(100);

let app = new App();
/* test API call */
app.controller.__testAPICall();

