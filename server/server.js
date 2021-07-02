/* base server for the application */
const express = require('express');
const request = require('request');
const morgan = require('morgan');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyparser.json()); /* handle JSON POST */
app.use(morgan("dev")); /* log server calls with performance timing */

/* log call requests with body */
app.use((request, response, next) => {
    console.log(`Received request for ${request.url} with/without body`);
    console.log(request.body);
    next();
});

/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));

/* handle request for recipe search from EDAMAM */
app.post("/recipes", (req, res) => {
    console.log("url: " + req.url);
    console.log("body: " + req.body);
    /* To be implemented */
    res.status(404);
    res.end();
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
