const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
// const { urlencoded } = require('body-parser')

const app =  express()
app.set("view engine", 'ejs')
app.set(bodyParser, urlencoded({extended: false}))
app.use(express.static("public"))
// const 

mongoose.set("useUnifiedTopology", true)
mongoose.connect('mongodb://localhost/sothebyDB', {useNewUrlParser: true});

const { Schema } = mongoose
const paintingSchema = new Schema ({
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

// Painting.insertMany([Creation, Athenes])
// Painting.deleteMany({name: "La Joconde"}, err => console.log(err || 'suppression effectuée'))
// Painting.save([ripo])
// Painting.find({}, err, data => console.log(err || data))

app.get('/', (req, res) => res.render("index", {}))
app.get('/paintings', (req, res) => {
    Painting.find({}, (err, peinture) => {
        if (err) console.log(err) 
        else res.render("paintings",{ oeuvres: peinture})
        // const 
        // res.render("paintings", {})

    //     res.send(err || peinture)
    })
})



app.listen(3000, () => {
    console.log("démarrage serveur sur port 3000...")
    console.log("body-parser pret")
    console.log("ejs prêt")
    console.log(`Base de données ${"sothebyDB"} initialisée`)
    console.log(` - collection ${"paintingSold"} prête`)
    console.log('Paré au décollage ... \n')
})