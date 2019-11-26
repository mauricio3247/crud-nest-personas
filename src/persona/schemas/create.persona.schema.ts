import Joi = require("@hapi/joi");
import { PersonaSexo } from "../interfaces/persona.interface";

export const schemaCreatePersona = Joi.object({
  nombre: Joi.string()
  .min(3)
  .max(15)
  .required(),

  apellido: Joi.string()
  .min(3)
  .max(15)
  .required(),
  
  email: Joi.string()
  .email()
  .required(),

  rut: Joi.string()
  .required(),

  //.message('rut chilean incorrect format')

  rut_chile: Joi.string()
  .pattern(/^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/)
  .message('formato de Rut Chile incorrecto')
  .required(),

  sexo: Joi.any()
  .valid(PersonaSexo.masculino, PersonaSexo.femenino)
  .required(),

  direcciones: Joi.array().items(Joi.string())
  .required()

  
  
})
