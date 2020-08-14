const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

module.exports = app;
