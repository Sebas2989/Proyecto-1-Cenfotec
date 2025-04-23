const mongoose = require('mongoose');



// Esquema denuncia
const denunciasSchema = new mongoose.Schema({
  correo: { type: String, required: true },
  asunto: { type: String, required: true },
  fecha: { type: Date, required: true },
  comentarios: { type: String, required: true },
  status: { type: String,enum: ['activo', 'resuelto', 'revision'],   default: 'activo' },
  fechaCreacion: {type:Date, default:Date.now},
  imagenes:{type:[String]},
},{ versionKey: false });

// Modelo de denuncia
const denunciaModel = mongoose.model('denuncias', denunciasSchema);

module.exports = denunciaModel;
  
