import Joi = require("@hapi/joi");
export const schemaQueryPersona = Joi.object({
  email: Joi.string()
  .email(),

  rut: Joi.string(),

  rut_chile: Joi.string()
  .pattern(/^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/)
  .message('formato de Rut Chile incorrecto'),

  direcciones: Joi.array().items(Joi.string())
  
})
