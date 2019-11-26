import * as mongoose from 'mongoose';

export const PersonaSchema = new mongoose.Schema({
  rut: {type:String, unique: true},
  rut_chile: {type:String, unique: true},
  nombre: String,
  apellido: String,
  email: {type:String, unique: true},
  sexo: {type: String, enum:['masculino','femenino'] },
  direcciones: [{_id: false, type: String}]
});