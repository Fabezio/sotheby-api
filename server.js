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
    imgUrl: "https://download.vikidia.org/vikidia/fr/images/thumb/1/19/Rapha%C3%ABl_-_L%27%C3%89cole_d%27Ath%C3%A8nes.jpg/300px-Rapha%C3%ABl_-_L%27%C3%89cole_d%27Ath%C3%A8nes.jpg",
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

// Painting.remove()
// Painting.deleteMany({name: "La Cène "}, err => console.log(err || 'suppression effectuée'))
// Painting.insertMany([Cene])
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