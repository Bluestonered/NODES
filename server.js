const express = require("express");
const app = express();

require("./routers/laureates.router")(app);
require("./routers/prizes.router")(app);
require("./routers/category.router")(app);
require("./routers/swagger.router")(app);


app.listen(3000);