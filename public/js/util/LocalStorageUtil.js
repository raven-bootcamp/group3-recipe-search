import logger from "./SimpleDebug.js";

export default class LocalStorageUtil {

    constructor(localStorage) {
        this.localStorage = localStorage;
    }


    saveWithStorageKey(key,saveData) {
        logger.log("Saving with key " + key, 100);
        logger.log(saveData,100);
        let stringifiedSaveData = JSON.stringify(saveData);
        logger.log(stringifiedSaveData, 101);
        this.localStorage.setItem(key, stringifiedSaveData);
    }

    getWithStorageKey(key) {
        let savedResults = [];
        logger.log("Loading with key " + key, 100);
        let savedResultsJSON = this.localStorage.getItem(key);
        logger.log(savedResultsJSON,101);
        if (savedResultsJSON !== null) {
            savedResults = JSON.parse(savedResultsJSON);
        }
        return savedResults;
    }

    /* add a new item to the local storage if not already there */
    addNewItemToKeyStorage(key,item) {
        if (item !== null) {
            logger.log("Adding with key " + key, 100);
            logger.log(item,101);
            let previousResults = this.getWithStorageKey(key);
            previousResults.push(item);
            this.saveWithStorageKey(key, previousResults);
        }
    }

    removeItemFromKeyStorage(key, item) {
        if (item !== null) {
            logger.log("Removing with key " + key, 100);
            logger.log(item,101);
            let previousResults = this.getWithStorageKey(key);
            let foundIndex = previousResults.findIndex((element) => element === item);
            if (foundIndex >= 0) {
                logger.log("Found item - removing ", 100);
                previousResults.splice(foundIndex,1);
                logger.log(previousResults,101);
                this.saveWithStorageKey(key,previousResults);
            }
        }
    }

    removeItemFromKeyStorageWithFunctionForEquality(key, item, testForEqualityFunction) {
        if (item !== null) {
            logger.log("Removing with key " + key + " and comparison function", 100);
            logger.log(item,101);
            let previousResults = this.getWithStorageKey(key);
            let foundIndex = previousResults.findIndex((element) => {
                return testForEqualityFunction(element,item)
            });
            if (foundIndex >= 0) {
                logger.log("Found item - removing ", 100);
                previousResults.splice(foundIndex,1);
                logger.log(previousResults,101);
                this.saveWithStorageKey(key,previousResults);
            }
        }

    }
}
