const { privateEncrypt } = require('crypto');
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

exports.updateMotivation = (req, res) => {

  const dataBuffer = fs.readFileSync('prize.json');
  const prizes = JSON.parse(dataBuffer.toString()).prizes

  //récupérer id des laureat
  const id = req.params.id
  //parcourir les laureat avec id
  const dataJSON = getLaureat();

  const idObject = dataJSON.find(function (obj) {
    return obj.id == id
  })

  const laureatePrizes = prizes.filter(prize => prize.laureates?.find(laureat => laureat.id === id))
  laureatePrizes.forEach(prize => {
    prize.motivation = prize.laureates.find(laureat => laureat.id === id).motivation
    delete (prize.laureates)
  })

  idObject.prizes = laureatePrizes
  //afficher
  res.send(idObject);

}


exports.findAll = (req, res) => {
  let finalLaureats = getLaureat()
  if (req.query.firstname) {
    // Filtrer finalLaureats sur le prénom
     finalLaureats = finalLaureats.filter(Laur => Laur.firstname  === req.query.firstname)
  }
  if (req.query.surname) {
    // Filtrer finalLaureats sur le nom
    finalLaureats = finalLaureats.filter(Laur => Laur.surname  === req.query.surname)
  }
  if (req.query.category) {
    // Filtrer finalLaureats sur la catégorie
    finalLaureats = finalLaureats.filter(Laur => Laur.category  === req.query.category)
  }
  res.send(finalLaureats)
}

exports.findDouble = (req, res) => {
  res.send(getMultipleLaureats());
}

exports.findId = (req, res) => {
  const dataBuffer = fs.readFileSync('prize.json');
  const prizes = JSON.parse(dataBuffer.toString()).prizes

  //récupérer id des laureat
  const id = req.params.id
  //parcourir les laureat avec id
  const dataJSON = getLaureat();

  const idObject = dataJSON.find(function (obj) {
    return obj.id == id
  })

  const laureatePrizes = prizes.filter(prize => prize.laureates?.find(laureat => laureat.id === id))
  laureatePrizes.forEach(prize => {
    prize.motivation = prize.laureates.find(laureat => laureat.id === id).motivation
    delete (prize.laureates)
  })

  idObject.prizes = laureatePrizes
  //afficher
  res.send(idObject);
};

exports.findNumber = (req, res) => {

  ObjLaureats = getLaureat().filter((Laureat) => {
    return Laureat
  })

  res.send(ObjLaureats.length.toString())
}

exports.findPage = (req, res) => {

  let page = req.params.page

  ObjLaureats = getLaureat().filter((Laureat) => {
    return Laureat
  })

  if (page == 1) {
    page = 0;
  }
  res.send(ObjLaureats.slice(10 * page, 10 * page + 10))
}

function getLaureat() {
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
          category: prize.category,
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

  dataJSON.forEach((prize) => {
    let count = 0;
    prize.laureates?.forEach((laureat) => {
      count++;
    });
    if (!laureatsNumber.find((p) => p.year === prize.year)) {
      laureatsNumber.push({
        year: prize.year,
        number: count
      });
    } else {
      laureatsNumber.find((p) => p.year === prize.year).number += count
    }
  });
  return laureatsNumber;
}

exports.findYear = (req, res) => {
  res.send(getLaureatesYearCount())
}


function getnolaureateyear(){
  console.log("M")
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes

  const laureatsNumber = [];
  const laureatsNumberPassed = [];


  dataJSON.forEach((prize) =>{
    let count = 0;
    prize.laureates?.forEach((laureat) => {
      count++;
    });
    if (!laureatsNumber.find((p) => p.year === prize.year) && (!laureatsNumberPassed.find((p) => p.year === prize.year))){
      if(count==0){
        laureatsNumber.push({
        year: prize.year,
        number: count
        });
      }else{
        if(!laureatsNumberPassed.find((p) => p.year === prize.year)){
          laureatsNumberPassed.push({
            year: prize.year
        })
      }
    }
    }else{
      if(count>0){
        if(!laureatsNumberPassed.find((p) => p.year === prize.year)){
          laureatsNumber.pop((p) => p.year === prize.year)  
        }
      }    
    }
  });
  return laureatsNumber;
};


exports.findYearNoLaureate = (req, res) => {
  res.send(getnolaureateyear())
}

function orderlaureates(req){
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes
  const signe = req.params['signe']
  const yearcount = [];

  dataJSON.forEach((prize) =>{
    let count = 0;
    prize.laureates?.forEach((laureat) => {
      count++;
    });
    if(count>0){
      if (!yearcount.find((p) => p.year === prize.year)){
        yearcount.push({
        year: prize.year,
        number: count
        });
      }else{
        yearcount.find((p) => p.year === prize.year ).number+=count
      }
    }
    
  });

  if(signe[0] == '+'){
    yearcount.sort((p1, p2) => p2.number-p1.number);
  }  if(signe[0] == '-'){
    yearcount.sort((p1, p2) => p1.number-p2.number);
  }
  return yearcount;
}

exports.orderlaureate = (req, res) => {
  res.send(orderlaureates(req))
}


function deletelaureate(req){
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes
  
  let id = req.params['id'];
  let year = req.params['annee'];
  let cate = req.params['categorie'];

  dataJSON.forEach((prize) => {
    if(prize.year == year && prize.category == cate){
      prize.laureates?.forEach((laureat) => {
        if(laureat.id == id){
          let deletedFilter = prize.laureates.filter(l => l.id !== id);
          prize.laureates = deletedFilter;
        }
    } );
    }
  });

  let prizes = {prizes: dataJSON}
  let newJSON = JSON.stringify(prizes);
  fs.writeFileSync('prize.json', newJSON)
} 

exports.delete = (req, res) => {
  res.send(deletelaureate(req))
}

function addlaureate(req){
  const dataBuffer = fs.readFileSync('prize.json');
  const dataJSON = JSON.parse(dataBuffer.toString()).prizes


  // let newid = req.params['id'];
  // let newfirstname = req.params['firstname'];
  // let newsurname = req.params['surname'];
  // let newmotivation = req.params['motivation'];
  // let newshare = req.params['share'];
  // let id = req.params['id'];
  // let year = req.params['annee'];
  // let cate = req.params['categorie'];
  let year = 2021;
  let cate = chemistry;
  let newid = 100000;
  let newfirstname = "Samson";
  let newsurname = "Phrog";
  let newmotivation = "pute";
  let newshare = 2;


  dataJSON.forEach((prize) => {
    if(prize.year == year && prize.category == cate){
      prize.laureates?.forEach((laureat) => {
        if(laureat.id == id){
          prize.laureates.push({
            id: id,
            firstname: newfirstname,
            surname: newsurname,
            motivation: newmotivation,
            share: newshare
          })
        }
    } );
    }
  });
  
  let prizes = {prizes: dataJSON}
  let newJSON = JSON.stringify(prizes);
  fs.writeFileSync('prize_added.json', newJSON)
} 

exports.add = (req, res) => {
  res.send(addlaureate(req))
}