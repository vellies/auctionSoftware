const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Vellieswaran application." });
});


//config Routers
require("./app/routes/product.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/project.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});