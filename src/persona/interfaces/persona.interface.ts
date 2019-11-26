import {Document} from 'mongoose'
export enum PersonaSexo {
  masculino= 'masculino',
  femenino = 'femenino'
}
export interface IPersona {
  rut: string,
  rut_chile: string,
  nombre: string,
  apellido: string,
  email: string,
  sexo: PersonaSexo,
  direcciones: string[]
}

export interface IPersonaDocument extends IPersona, Document {
  
}