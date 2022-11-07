const { privateEncrypt } = require('crypto');
const cat_controller = require("./category.controllers");
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
    const dataJSON = getLaureates();

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
    let finalLaureats = getLaureates()
    if (req.query.firstname) {
        // Filtrer finalLaureats sur le prénom
        finalLaureats = finalLaureats.filter(Laur => Laur.firstname === req.query.firstname)
    }
    if (req.query.surname) {
        // Filtrer finalLaureats sur le nom
        finalLaureats = finalLaureats.filter(Laur => Laur.surname === req.query.surname)
    }
    if (req.query.category) {
        // Filtrer finalLaureats sur la catégorie
        finalLaureats = finalLaureats.filter(Laur => Laur.category === req.query.category)
    }
    res.send(finalLaureats)
}

exports.findDouble = (req, res) => {
    res.send(getMultipleLaureats());
}

exports.findId = (req, res) => {
    const dataBuffer = fs.readFileSync('prize.json');
    const prizes = JSON.parse(dataBuffer.toString()).prizes;

    //récupérer id des laureat
    const id = req.params.id;

    //parcourir les laureat avec id
    const dataJSON = getLaureates();

    const idObject = dataJSON.find(function (obj) {
        return obj.id == id;
    })
    if (!idObject){
        return res.status(404).send("erreur");
    }

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
    ObjLaureats = getLaureates().filter((Laureat) => {
        return Laureat
    })
    res.send(ObjLaureats.length.toString())
}

exports.findPage = (req, res) => {

    let page = req.params.page

    ObjLaureats = getLaureates().filter((Laureat) => {
        return Laureat
    })

    if (page == 1) {
        page = 0;
    }
    res.send(ObjLaureats.slice(10 * page, 10 * page + 10))
}

function getLaureates() {
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

function getLaureatesYearCount() {
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


function getnolaureateyear() {
    console.log("M")
    const dataBuffer = fs.readFileSync('prize.json');
    const dataJSON = JSON.parse(dataBuffer.toString()).prizes

    const laureatsNumber = [];
    const laureatsNumberPassed = [];


    dataJSON.forEach((prize) => {
        let count = 0;
        prize.laureates?.forEach((laureat) => {
            count++;
        });
        if (!laureatsNumber.find((p) => p.year === prize.year) && (!laureatsNumberPassed.find((p) => p.year === prize.year))) {
            if (count == 0) {
                laureatsNumber.push({
                    year: prize.year,
                    number: count
                });
            } else {
                if (!laureatsNumberPassed.find((p) => p.year === prize.year)) {
                    laureatsNumberPassed.push({
                        year: prize.year
                    })
                }
            }
        } else {
            if (count > 0) {
                if (!laureatsNumberPassed.find((p) => p.year === prize.year)) {
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

function orderlaureates(req) {
    const dataBuffer = fs.readFileSync('prize.json');
    const dataJSON = JSON.parse(dataBuffer.toString()).prizes
    const signe = req.params['signe']
    const yearcount = [];

    dataJSON.forEach((prize) => {
        let count = 0;
        prize.laureates?.forEach((laureat) => {
            count++;
        });
        if (count > 0) {
            if (!yearcount.find((p) => p.year === prize.year)) {
                yearcount.push({
                    year: prize.year,
                    number: count
                });
            } else {
                yearcount.find((p) => p.year === prize.year).number += count
            }
        }

    });

    if (signe[0] == '+') {
        yearcount.sort((p1, p2) => p2.number - p1.number);
    } if (signe[0] == '-') {
        yearcount.sort((p1, p2) => p1.number - p2.number);
    }
    return yearcount;
}

exports.orderlaureate = (req, res) => {
    res.send(orderlaureates(req))
}

exports.update = (req, res) => {
    res.send(updateLaureate(req))
}

function updateLaureate(req) {
    const dataBuffer = fs.readFileSync('prize.json');
    const dataJSON = JSON.parse(dataBuffer.toString()).prizes

    const {id, year, category, motivation} = req.body

    const filteredPrizeID = dataJSON.findIndex(prize => prize.year == year && prize.category == category)

    if (filteredPrizeID == -1)
        return JSON.stringify({code: 404, message: "cannot find given year or category"})

    const filteredLaureateID = dataJSON[filteredPrizeID].laureates.findIndex(l => l.id == id)

    if (filteredLaureateID == -1)
        return JSON.stringify({code: 404, message: "cannot find given laureate for given category in given year"})

    dataJSON[filteredPrizeID].laureates[filteredLaureateID].motivation = motivation

    fs.writeFileSync('prize.json', JSON.stringify({prizes: dataJSON}, null, 2))

    return JSON.stringify({code: 200, message: "successfully update laureate motivation"})
}


function deleteLaureate(req) {
    const dataBuffer = fs.readFileSync('prize.json');
    const dataJSON = JSON.parse(dataBuffer.toString()).prizes

    let {id, year, category} = req.body

    const filteredPrizeID = dataJSON.findIndex(prize => prize.year == year && prize.category == category)

    if (filteredPrizeID == -1)
        return JSON.stringify({code: 404, message: "cannot find given year or category"})

    if (!dataJSON[filteredPrizeID].laureates?.find(l => l.id == id))
        return JSON.stringify({code: 404, message: "cannot find given laureate for given category in given year"})

    dataJSON[filteredPrizeID].laureates = dataJSON[filteredPrizeID].laureates.filter(l => l.id != id)

    fs.writeFileSync('prize.json', JSON.stringify({prizes: dataJSON}, null, 2))

    if (!dataJSON[filteredPrizeID].laureates.find(l => l.id == id))
        return JSON.stringify({code: 200, message: "successfully deleted laureate"})
}

exports.delete = (req, res) => {
    console.log(req.params);
    res.send(deleteLaureate(req))
}


function addlaureate(req) {
    const dataBuffer = fs.readFileSync('prize.json');
    const dataJSON = JSON.parse(dataBuffer.toString()).prizes
    const laureates = getLaureates()

    let id = laureates.length;

    const { firstname, surname, motivation, year, category} = req.body;

    const filteredPrizeID = dataJSON.findIndex(prize => prize.year == year && prize.category == category)

    const foundLaureate = laureates.find(l => l.firstname == firstname && l.surname == surname)
    if (foundLaureate)
        return JSON.stringify({code: 400, message: "error, this laureat already exist"})


    if (!dataJSON[filteredPrizeID].laureates)
        dataJSON[filteredPrizeID].laureates = []

    dataJSON[filteredPrizeID].laureates.push({id, firstname, surname, motivation})

    fs.writeFileSync('prize.json', JSON.stringify({prizes: dataJSON}, null, 2))
    return JSON.stringify({code: 200, message: "successfully added laureate with id:"+id})
}
exports.add_view = (req,res) => {
    let categories = cat_controller.getCategories();
    res.render("vue2", {categories:categories});
};

exports.add = (req, res) => {
    res.send(addlaureate(req));
};