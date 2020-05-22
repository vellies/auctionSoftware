const express = require("express");
const bodyParser = require("body-parser");
const config = require('./app/config/jwt.json');
const jwt = require('jsonwebtoken');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Vellieswaran application." });
});

// simple route
app.post("/api/posts",verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/logon', (req, res) => {
  const user = {
    id: 1,
    name: "vellies",
    email: "vellies@gamil.com"
  }
  const secrete='vellies'
  console.log("kkkkk",config.expiresIn)
  jwt.sign( {user} , config.secret,config.expiresIn, (err, token) => {
    res.json({
      token
    })
  });
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req,res,next){
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

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