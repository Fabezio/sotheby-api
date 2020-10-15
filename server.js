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
    imgUrl: String,
    author: String,
    price: Number
})
const Painting = mongoose.model("paintingSold", paintingSchema)

const Joconde = new Painting ({
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    name: "La Joconde",
    author: "Da Vinci",
    price: 109
})
const Guernica = new Painting ({
    imgUrl: "https://img.lemde.fr/2017/04/26/0/256/3033/1516/1440/720/60/0/6fc546e_29800-o4vvkx.p5iy17cik9.jpg",
    name: "Guernica",
    author: "Picasso",
    price: 250
})
const Athenes = new Painting ({
    imgUrl: "https://cdn.pixabay.com/photo/2016/01/16/18/30/art-school-of-athens-1143741_1280.jpg",
    name: "L'école d'Athènes",
    author: "Raphael",
    price: 300
})
const Creation = new Painting ({
    imgUrl: "https://cdn.unitycms.io/image/ocroped/1200,1200,1000,1000,0,0/SpPAkr26Fbg/1FbXscSJq5HAdtmaazDrjl.jpg",
    name: "La Création d'Adam",
    author: "Michel-Ange",
    price: 400
})
const Cene = new Painting ({
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg/1920px-Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg",
    name: "La Cène",
    author: "Da Vinci",
    price: 1000
})


function entryHandle(str) {
    (function (err) {console.log(err || str)    })
}
// Painting.insertMany([Joconde, Athenes, Creation, Cene, Guernica], err => console.log(err || 'insertion effectuée'))

// Painting.save([ripo])
// Painting.find({}, err, data => console.log(err || data))

app.get('/', (req, res) => res.render("index", {}))
// Painting.find().size({}, (err, nb) => console.log(err || nb))
// console.log()

app.get('/paintings', (req, res) => {
    Painting.find({}, (err, peintures) => {
        if (err) console.log(err) 
        // else res.send(peintures)
        else res.render ("paintings",{ oeuvres: peintures})
        // const 
        // res.render("paintings", {})

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
    thisPaint.save({}, 
        entryHandle("enregistrement effectué")
        // (err, data) => {
        //     console.log(err || 'enregistrement effectué')
        //     res.send(data)

        // }
    )
    //     // console.log(err || req.body.name)

})
app.get('/paintings/:name', (req, res) => {
    // console.log(req.params.name)
    Painting.findOne({name: req.params.name}, (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log("voilà, chef!")
            res.render("_name", {data: data})
        }
        // return console.log(err || "nom incorrect") || res.render("_name", {data: data})
    })
})
app.put('/paintings/:name', (req, res) => {
    // console.log(req.params.name)
    Painting.update(
        {name: req.params.name},
        {
            name: req.body.name,
            imgUrl: req.body.imgUrl,
            author: req.body.author,
            price: req.body.price,
        }, {overwrite: true},
        entryHandle("mise à jour via PUT")
        // (err, data) => {
        // if (err) {
        //     console.log(err)
        //     res.send(err)
        // } else {
        //     console.log("mise a jour complete")
        //     res.render("_name", {data: data})
        // }
    )
})

app.patch('/paintings/:name', (req, res) => {
    // console.log(req.params.name)
    Painting.update(
        {name: req.params.name}, {$set: req.body},
        // (err, data) => {
        //     if (err) {
        //         console.log(err)
        //         res.send(err)
        //     } else {
        //         console.log("mise a jour complete")
        //         res.render("_name", {data: data})
        //     }
        // }
        entryHandle('mise à jour via PATCH')
    )
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
