const express = require('express')
const app = express()
const ambulances = require('./data/ambulances.json')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/ambulances', (req, res)=>{
    res.status(200).json(ambulances)
})

app.post('/ambulances', function (req, res){
    console.log(req.body)
    ambulances.push(req.body)
    res.status(201).json(ambulances)
})

app.get('/ambulances/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const ambulance = ambulances.find(ambulance => ambulance.id === id)
    res.status(200).json(ambulance)
})

app.put('/ambulances/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    let ambulance = ambulances.find(ambulance => ambulance.id === id);
    ambulance.marque = req.body.marque
    ambulance.modele = req.body.modele
    ambulance.couleur = req.body.couleur

    res.status(303).json(ambulance)
})

app.delete('/ambulances/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    let ambulance = ambulances.find(ambulance => ambulance.id === id);
    ambulances.splice(ambulances.indexOf(ambulance), 1);

    res.status(200).json(ambulance)
})

app.listen(8080, () => {console.log("Server started on 8080..")})
