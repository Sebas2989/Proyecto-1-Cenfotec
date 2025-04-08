//Llamamos al modulo de mongoose

const mongoose = require('mongoose');

//Definimos donde se conectara
const DB_URL = 'mongodb://localhost:27017/Proyecto';

//Conectamos
mongoose.connect(DB_URL,{})

    .then(()=>console.log("DB CONECTADA"))
    .catch(err=>console.log(err))


//Schema
let userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{versionKey:false});

//Model
let user = new mongoose.model('Users',userSchema);

module.exports = user;