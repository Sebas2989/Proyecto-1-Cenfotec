//Llamamos al modulo de mongoose

const mongoose = require('mongoose');

//Definimos donde se conectara
const DB_URL = 'mongodb://localhost:27017/Proyecto';

//Schema
const noticiasSchema = new mongoose.Schema({
    nombreNoticia: { type: String, required: true },
    fechaPublicacion: { type: String, required: true },
    contenidoNoticia: { type: String, required: true },
    imagen: { type: String, required: false }
},{versionKey: false});

//Creamos la coleccion 
//Model
const Noticia = new mongoose.model('noticias',noticiasSchema);


module.exports = Noticia;