class SimpleDebug {
    constructor() {
        this.debugOn = true;
        this.debugDepth = 100;
    }

    log(message, debugDepth = -1) {
        if (!this.debugOn) return;
        if (debugDepth > this.debugDepth) return;
        console.log(message);
    }

    setLevel(newLevel) {
        this.debugDepth = newLevel;
    }

    setOn() {
        this.debugOn = true;
    }

    setOff() {
        this.debugOn = false;
    }

}

let logger = new SimpleDebug();
export default logger;