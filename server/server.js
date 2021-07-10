/* base server for the application */
const express = require('express');
const request = require('request');
const morgan = require('morgan');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyparser.json()); /* handle JSON POST */

isDevelopment = (process.env.RUNTIME === "Development");

/* Are we in Development or in Production? */
if (isDevelopment) {
    app.use(morgan("dev")); /* log server calls with performance timing with development details */

    /* log call requests with body */
    app.use((request, response, next) => {
        console.log(`Received request for ${request.url} with/without body`);
        console.log(request.body);
        next();
    });
} else {
    app.use(morgan("combined")); /* log server calls per standard combined Apache combined format */

}

/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static(process.env.SERVER_ROOT));

/* handle request for recipe search from EDAMAM */
app.post("/recipes", (req, res) => {
    // Construct the API call from the supplied JSON parameters
    let parameters = req.body.parameters;
    // start with the mandatory options and recipes that have images
    let newURL = process.env.EDAMAM_API_URL+
        process.env.EDAMAM_MANDATORY_API_KEY_RECIPE_TYPE +
        process.env.EDAMAM_MANDATORY_APP_ID +
        process.env.EDAMAM_MANDATORY_APP_KEY +
        process.env.EDAMAM_MANDATORY_API_KEY_IMAGE;

    // Do we have any query text?
    if (parameters.q) newURL += process.env.EDAMAM_API_KEY_QUERY_TEXT + parameters.q;
    // Do we have a diet restricton?
    if (parameters.hasDietSelection) {
        newURL += process.env.EDAMAM_API_KEY_DIET;
        let chosenDiets = "";
        if (parameters.isBalancedDiet) chosenDiets += process.env.EDAMAM_API_DIET_VALUE_BALANCED;
        if (parameters.isHighFiber) chosenDiets += process.env.EDAMAM_API_DIET_VALUE_HIGH_FIBRE;
        if (parameters.isHighProtein) chosenDiets += process.env.EDAMAM_API_DIET_VALUE_HIGH_PROTEIN;
        if (parameters.isLowCarb) chosenDiets += process.env.EDAMAM_API_DIET_VALUE_LOW_CARB;
        if (parameters.isLowFat) chosenDiets += process.env.EDAMAM_API_DIET_VALUE_LOW_FAT;
        if (parameters.isLowSodium) chosenDiets += process.env.EDAMAM_API_DIET_VALUE_LOW_SODIUM;
        newURL += chosenDiets;
    }
    // Do we have a health restriction?
    if (parameters.hasHealthSelection) {
        newURL += process.env.EDAMAM_API_KEY_HEALTH;
        let chosenDiets = "";
        if (parameters.isDiaryFree) chosenDiets += process.env.EDAMAM_API_HEALTH_VALUE_DIARY_FREE;
        if (parameters.isGlutenFree) chosenDiets += process.env.EDAMAM_API_HEALTH_VALUE_GLUTEN_FREE;
        if (parameters.isKosher) chosenDiets += process.env.EDAMAM_API_HEALTH_VALUE_KOSHER;
        if (parameters.isVegan) chosenDiets += process.env.EDAMAM_API_HEALTH_VALUE_VEGAN;
        if (parameters.isVegetarian) chosenDiets += process.env.EDAMAM_API_HEALTH_VALUE_VEGETARIAN;
        if (parameters.isDiabetic) chosenDiets += process.env.EDAMAM_API_HEALTH_VALUE_DIABETIC;
        newURL += chosenDiets;
    }
    // Do we have a meal type?
    if (parameters.hasMealTypeSelection) {
        newURL += process.env.EDAMAM_API_KEY_MEAL_TYPE;
        let chosenDiets = "";
        if (parameters.isBreakfast) chosenDiets += process.env.EDAMAM_API_MEAL_TYPE_VALUE_BREAKFAST;
        if (parameters.isLunch) chosenDiets += process.env.EDAMAM_API_MEAL_TYPE_VALUE_LUNCH;
        if (parameters.isDinner) chosenDiets += process.env.EDAMAM_API_MEAL_TYPE_VALUE_DINNER;
        if (parameters.isSnack) chosenDiets += process.env.EDAMAM_API_MEAL_TYPE_VALUE_SNACK;
        newURL += chosenDiets;
    }

    if (isDevelopment) console.log("API Call is: " + newURL);
    request(newURL, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (isDevelopment) console.log('body:', body);
        res.status(response.statusCode);
        res.json(body);
    });

});

app.post("/supermarkets", (req, res) => {
    // Construct the API call from the supplied JSON parameters
    let parameters = req.body.parameters;
    // start with the mandatory options and recipes that have images
    let newURL = process.env.PLACES_API_URL;

    //do we have a user location?
    if (parameters.lat !== null) {
        newURL += process.env.PLACES_API_KEY_RADIUS + parameters.lat + "," + parameters.lon;
    }

    newURL += process.env.PLACES_API_KEY_KEY;

    if (isDevelopment) console.log("API Call is: " + newURL);
    request(newURL, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (isDevelopment) console.log('body:', body);
        res.status(response.statusCode);
        res.json(body);
    });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
