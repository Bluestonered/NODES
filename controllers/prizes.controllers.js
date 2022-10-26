const fs = require('fs');

exports.findAll = (req, res) => {
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const laureats = [];
  const objCategory = dataJSON.filter((categorys) => {
    return categorys.laureates != null;
  })

  res.send(objCategory.length.toString())
}