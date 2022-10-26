const fs = require('fs');



function getMultipleLaureats() {
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const laureats = [];
  const multipleLaureats = [];

  dataJSON.forEach((prize) => {
    prize.laureates?.forEach((laureat) => {
      if (!laureats.find((l) => l.id === laureat.id))
        laureats.push({
          id: laureat.id,
          firstname: laureat.firstname,
          surname: laureat.surname,
        });
      else if (!multipleLaureats.find((l) => l.id === laureat.id)) {
        multipleLaureats.push({
          id: laureat.id,
          firstname: laureat.firstname,
          surname: laureat.surname,
          number: 2
        });
      } else {
        multipleLaureats.find((l) => l.id === laureat.id).number++ 
      }
    });
  });

  return multipleLaureats;
}

exports.findAll = (req, res) => {
    res.send(getlaureat())
  }

exports.findDouble = (req, res) => {
  res.send(getMultipleLaureats());
}

exports.findId = (req, res) => {
  //récupérer id des laureat
  const id = req.params.id
  //parcourir les laureat avec id
  const dataJSON = getlaureat();

  const idObject = dataJSON.find(function(obj){    
    return obj.id == id    
  })
  //afficher
  res.send(idObject);
};

exports.findNumber = (req, res) => {

  ObjLaureats = getlaureat().filter((Laureat) => {
    return Laureat
  })

  res.send(ObjLaureats.length.toString())
}

exports.findPage = (req, res) => {

  let page = req.params.page

  ObjLaureats = getlaureat().filter((Laureat) => {
    return Laureat
  })

  if (page == 1)
  {
    page = 0;
  }
  res.send(ObjLaureats.slice(10 * page,10 * page +10))
}

function getlaureat()
{
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const laureats = [];

  //VOILA
  dataJSON.forEach((prize) => {
    prize.laureates?.forEach((laureat) => {
      if (!laureats.find((l) => l.id === laureat.id))
        laureats.push({
          id: laureat.id,
          firstname: laureat.firstname,
          surname: laureat.surname,
        });
    });
  });

  return laureats;
}

function getLaureatesYearCount(){
  console.log("M")
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const laureatsNumber = [];

  dataJSON.forEach((prize) =>{
    let count = 0;
    prize.laureates?.forEach((laureat) => {
      count++;
    });
    if (!laureatsNumber.find((p) => p.year === prize.year)){
      laureatsNumber.push({
      year: prize.year,
      number: count
      });
    }else{
      laureatsNumber.find((p) => p.year === prize.year ).number+=count
    }
  });
  return laureatsNumber;
}

exports.findYear = (req, res) => {
  res.send(getLaureatesYearCount())
}