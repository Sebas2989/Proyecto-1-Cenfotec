//Llamamos al modulo de mongoose

const mongoose = require('mongoose');

//Definimos donde se conectara
const DB_URL = 'mongodb://localhost:27017/proyectoFinalI2025';

//Conectamos
mongoose.connect(DB_URL,{})

    .then(()=>console.log("Base de Datos Conectada"))
    .catch(err=>console.log(err))


//Schema
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    identificacion: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password2: { type: String},
    direccion: { type: String },
    informacion: { type: String },
    distrito: { type: String },
    telefono: { type: String },
    imagen: { type: String },
    rol: { type: String, default: 'usuario' }
},{versionKey: false});

//Creamos la coleccion 
//Model
const user = new mongoose.model('usuarios',userSchema);


module.exports = user;