const fs = require('fs');

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
        count: 1
      })
    } else {
      categories.find((categ) => categ?.category === prize.category).count++
    }
  });

  console.log(categories)
  
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