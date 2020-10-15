const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
// const { urlencoded } = require('body-parser')

const app =  express()

// app.use(bodyParser, urlencoded({extended: false}))
app.use(bodyParser.urlencoded({extended: false}))
app.set("view engine", 'ejs')
app.use(express.static("public"))
// const 

mongoose.set("useUnifiedTopology", true)
mongoose.connect('mongodb://localhost/sothebyDB', {useNewUrlParser: true});

// const { Schema } = mongoose

const paintingSchema = new mongoose.Schema ({
    name: String,
    author: String,
    price: Number
})
const Painting = mongoose.model("paintingSold", paintingSchema)

const Joconde = new Painting ({
    name: "La Joconde",
    author: "Da Vinci",
    price: 109
})
const Guernica = new Painting ({
    name: "Guernica",
    author: "Picasso",
    price: 250
})
const Athenes = new Painting ({
    name: "L'école d'Athènes",
    author: "Raphael",
    price: 300
})
const Creation = new Painting ({
    name: "La Création d'Adam",
    author: "Michel-Ange",
    price: 400
})
const Cene = new Painting ({
    name: "La Cène",
    author: "Da Vinci",
    price: 1000
})
// Painting.updateOne({name: "L'école d'Athènes"}, {imgUrl: "https://cdn.pixabay.com/photo/2016/01/16/18/30/art-school-of-athens-1143741_1280.jpg"}, err => console.log(err || "mise à jour réussie"))
// Painting.insertMany([Joconde, Athenes, Creation, Cene, Guernica], err => console.log(err || 'insertions effectuées'))
// Painting.deleteMany({name: "La Joconde"}, err => console.log(err || 'suppression effectuée'))
// Painting.deleteMany({name: "La Cène"}, err => console.log(err || 'suppression effectuée'))
// Painting.deleteMany({name: "La Création d'Adam"}, err => console.log(err || 'suppression effectuée'))
// Painting.deleteMany({name: "Guernica"}, err => console.log(err || 'suppression effectuée'))
// Painting.deleteMany({name: "L'école d'Athènes"}, err => console.log(err || 'suppression effectuée'))
// Painting.save([ripo])
// Painting.find({}, err, data => console.log(err || data))

app.get('/', (req, res) => res.render("index", {}))
Painting.find().size({}, (err, nb) => console.log(err || nb))
console.log()

app.get('/paintings', (req, res) => {
    Painting.find({}, (err, peintures) => {
        if (err) console.log(err) 
        // else res.send(peintures)
        // else res.send("paintings",{ oeuvres: peinture})
        // const 
        res.render("paintings", {})

        // res.send(err || peinture)
    })
})
app.get("/addPainting", (req, res) => {
    res.render("addPainting")
})
// app.get('paintings/add-painting', (req, res) => res.render("add-painting", {}))
app.post('/paintings', function (req, res) {
    // res.send(req)
    const thisPaint = new Painting({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price
    })
    // Painting = [...Painting, thisPaint]
    thisPaint.save({}, (err, data) => {
        console.log(err || 'enregistrement effectué')
        res.send(data)

    })
    //     // console.log(err || req.body.name)

})
app.delete("/paintings", (req, res) => {
    Painting.deleteMany({}, err => console.log(err || "peintures supprimées"))
})



app.listen(3000, () => {
    console.log("démarrage serveur sur port 3000...")
    // console.log("body-parser pret")
    // console.log("ejs prêt")
    // console.log(`Base de données ${"sothebyDB"} initialisée`)
    // console.log(` - collection ${"paintingSold"} prête`)
    // console.log('Paré au décollage ... \n')
})