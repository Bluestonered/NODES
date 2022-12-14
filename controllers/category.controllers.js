const fs = require('fs');

exports.findLaureates = (req, res) => {
  let cat = req.query.category;
  if (!cat){
    cat = "chemistry";
  }

  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes
  let laureates_set = new Set();

  dataJSON.filter(prize => {
    if (prize.category == cat && "laureates" in prize){
      prize.laureates.forEach(laureate => {
        laureate.year = prize.year;
        laureates_set.add(laureate);
      });
    }
  });
  res.status(200).render("vue1", {laureates:Array.from(laureates_set), categories:getCategories(), category:cat})
}

exports.findAll = (req, res) => {
  res.send(getCategories())
}

exports.findCount = (req, res) => {
  res.send(getCategoriesCount())
}

function getCategoriesCount() {
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const categories = [];

  //VOILA
  dataJSON.forEach((prize) => {
    if (!categories.find((categ) => categ?.category === prize.category)) {
      categories.push({
        category: prize.category,
        count: 0
      })
      let nbr = 0;
        prize.laureates?.forEach((laureat) => {
          nbr++;
        });
      categories.find((categ) => categ?.category === prize.category).count+=nbr
    } else {
      let nbr = 0;
        prize.laureates?.forEach((laureat) => {
          nbr++;
        });
      categories.find((categ) => categ?.category === prize.category).count+=nbr
    }
  });

  categories.sort((categ1, categ2) => categ2.count - categ1.count);
  return categories;
}

function getCategories() {
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const categories = [];

  //VOILA
  dataJSON.forEach((prize) => {
    if (!categories.find((categ) => categ === prize.category)) {
      categories.push(prize.category)
    }
  });

  return categories;
}

exports.getCategories = getCategories;