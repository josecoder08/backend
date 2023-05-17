const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parseo request de content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parseo requests  content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// ruta simple o simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to raulitux application." });
});

require("./app/routes/tutorial.routes.js")(app);

// seteo port para escucha
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
