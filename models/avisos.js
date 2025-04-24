//Llamamos al modulo de mongoose

const mongoose = require('mongoose');

//Definimos donde se conectara
const DB_URL = 'mongodb://localhost:27017/Proyecto';

//Schema
const avisosSchema = new mongoose.Schema({
    avisosTitulo: { type: String, required: true },
    avisosFecha: { type: String, required: true },
    avisosContenido: { type: String, required: true },
},{versionKey: false});

//Creamos la coleccion 
//Model
const Aviso = new mongoose.model('avisos',avisosSchema);


module.exports = Aviso;