const fs = require('fs');

exports.findAll = (req, res) => {
    res.send(getlaureat())
  }

function getlaureat()
{
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const categorys = [];
  const categorysComp = [];

  //VOILA
  dataJSON.forEach((prize) => {
    categorys.push(prize.category)
    if (!categorys.find((categ) => categ === prize.category))
    {
      categorysComp.push({categorys});
    }
  });

  return categorysComp;
}