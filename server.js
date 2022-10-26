const express = require("express");
const app = express();

// app.get("/laureats/multiple", (req, res) => {
//   const dataBuffer = fs.readFileSync('prize.json');
//   const dataJSON = JSON.parse(dataBuffer.toString()).prizes

//   const idmap = dataJSON.map(function(obj){    
//     return obj.laureates
//   })

//   let i = 0;
//   while (true){
//     const iddouble = idmap.filter(function(sameid)
//     {
//       i+=1
//       return sameid.id == i
//     })
//   }



//   console.log(idmap)
// })

// app.get('/omelette', reader);

require("./routers/laureates.router")(app);
require("./routers/prizes.router")(app);
require("./routers/category.router")(app);

app.listen(3000);