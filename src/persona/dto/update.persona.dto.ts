import { IPersona, PersonaSexo } from "../interfaces/persona.interface";


export default class UpdatePersonaDto implements IPersona {
  readonly nombre:string;
  readonly apellido:string;
  readonly email:string;
  readonly rut:string;
  readonly rut_chile: string;
  readonly direcciones: string[];
  readonly sexo: PersonaSexo;


}