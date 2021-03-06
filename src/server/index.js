const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();
const cors = require("cors");
console.log(process.env.API_KEY);
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

const port = process.env.PORT || 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log("Example app listening on port 8081!");
});

const baseURL = "https://api.meaningcloud.com/sentiment-2.1?";
const apiKey = process.env.API_KEY;

//@route      post /validate
//@desc       post the url to the api and the results back
//@access     Public
app.post("/validate", async (req, res) => {
    //extract the url from the body
    const { url } = req.body;

    const apiURL = `${baseURL}key=${apiKey}&url=${url}&lang=en`;

    const response = await axios.get(apiURL);

    const ValidationData = await response.data;
    res.json(ValidationData);
});
