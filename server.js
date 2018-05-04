const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const PORT  = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());


require(path.join(__dirname, "./app/routing/htmlRoutes"))(app)

require(path.join(__dirname, "./app/routing/apiRoutes"))(app);



app.listen(PORT, function() {
    console.log("APP listening on port: " + PORT);
});