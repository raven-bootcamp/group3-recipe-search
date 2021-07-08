import logger from "./SimpleDebug";

class BufferUtil {

    constructor() {
      this.buffer = {};
    }

    isKeyInBuffer(key) {
        return (Object(this.buffer).keys().findIndex((element) => element === key) >= 0);
    }

    addKeyToBuffer(key,value) {
        Object.assign(this.buffer,{key,value});
    }

    getValueFromBufferWithKey(key) {
        let result = [];
        let entries = Object.entries(this.buffer);
        for (let index =0;index < entries.length;index++) {
            let entry = entries[index];
            if (entry[0] === key) {
                result = entry[1];
            }
        }
    }

    setValueToBufferWithKey(key,value) {
        if (value === null) return;
        let entries = Object.entries(this.buffer);
        for (let index =0;index < entries.length;index++) {
            let entry = entries[index];
            if (entry[0] === key) {
                entry[1] = value;
            }
        }
    }

    addValueToBufferWithKey(key,additionalValue) {
        if (additionalValue === null) return;
        if (this.isKeyInBuffer(key)) {
            let currentValues = this.getBufferWithKey(key);
            currentValues.push(additionalValue);
        }
        else {
            this.setValueToBufferWithKey(key, additionalValue);
        }
    }

    removeValueFromBufferKeyAndEqualityFn(key,value,equalFn) {
        if (value !== null) {
            let currentValues = this.getBufferWithKey(key);
            let foundIndex = currentValues.findIndex((element) => {
                return equalFn(element,value)
            });
            if (foundIndex >= 0) {
                currentValues.splice(foundIndex,1);
                this.setValueToBufferWithKey(key,currentValues);
            }
        }
    }

    getBufferWithKey(key) {
        let result = [];
        if (this.isKeyInBuffer(key)) {
            result = this.getValueFromBufferWithKey(key);
        }
        else {
            this.addKeyToBuffer(key,result);
        }
        return result;
    }
}
