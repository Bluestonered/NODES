//API_REST
//Hugo FOULON, Arnaud CHEVALME, Lilian SCHOTT, Samson DUPUY
///////////////////////////////////////////////////////////
const express = require("express");
const hbengine = require("express-handlebars");
const port = 3000;
const app = express();

app.use(express.json());

app.engine("hbs", hbengine.engine({
    defaultLayout:"main",
    extname:".hbs"
}));

app.set("view engine", "hbs");

require("./routers/laureates.router")(app);
require("./routers/prizes.router")(app);
require("./routers/category.router")(app);
require("./routers/swagger.router")(app);

app.listen(port);