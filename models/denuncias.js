const mongoose = require('mongoose');
const { nanoid } = require('nanoid');







// Esquema denuncia
const denunciasSchema = new mongoose.Schema({
    _id: { type: String, default: () => nanoid(5)},
    asunto: { type: String, required: true },
    fecha: { type: Date, required: true },
    comentarios: { type: String, required: true },
    status: { type: String,enum: ['activo', 'resuelto', 'revision'],   default: 'activo' },
    fechaCreacion: {type:Date, default:Date.now}



  },{ versionKey: false });

  // Modelo de denuncia
const denunciaModel = mongoose.model('denuncias', denunciasSchema);

module.exports = denunciaModel;
