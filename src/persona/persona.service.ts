import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {IPersonaDocument} from './interfaces/persona.interface'
import CreatePersonaDto from './dto/create.persona.dto';
import UpdatePersonaDto from './dto/update.persona.dto';
import QueryPersonaDto from './dto/query.persona.dto';

@Injectable()
export class PersonaService {
  constructor(@InjectModel('Persona') private readonly personaModel: Model<IPersonaDocument>) {}


  private async _getPersonaById (id:string) {
    return this.personaModel.findOne({_id: id})
  }

  private async _getPersonaByRutChile (rut_chile:string) {
    return this.personaModel.findOne({rut_chile});
  }

  private async _getPersonaByRut (rut:string) {
    return this.personaModel.findOne({rut});
  }

  private async _getPersonaByEmail (email: string) {
    return this.personaModel.findOne({email})
  }
  private async _isRutUsed (rut:string) {
    return await this._getPersonaByRut(rut) != null
  }

  private async _isEmailUsed(email:string) {
    return await this._getPersonaByEmail(email)!=null
  }

  private async _isRutChileUsed(rut_chile:string) {
    return await this._getPersonaByRutChile(rut_chile) != null
  }

  private async _isEmailUsedForOther (email:string, id:string) {
    let persona = await this._getPersonaByEmail(email);
    return persona != null && persona._id.toString() !== id
  } 

  private async _isRutUsedForOther (rut: string, id: string) {
    let persona = await this._getPersonaByRut(rut);
    return persona != null && persona._id.toString() !== id
  }

  private async _isRutChileUsedForOther (rut: string, id: string) {
    let persona = await this._getPersonaByRutChile(rut);
    return persona != null && persona._id.toString() !== id
  }
  async createPersona (createPersonaDTO: CreatePersonaDto):Promise<IPersonaDocument> {
    if (await this._isEmailUsed(createPersonaDTO.email)) {
      throw new BadRequestException('Email ya se encuentra registrado') 
    }

    if (await this._isRutUsed(createPersonaDTO.rut)) {
      throw new BadRequestException('RUT ya se encuentra registrado') 
    }

    if (await this._isRutChileUsed(createPersonaDTO.rut_chile)) {
      throw new BadRequestException('RUT CHILE ya se encuentra registrado') 
    }
    let persona =  new this.personaModel(createPersonaDTO)
    return persona.save()
  }

  async updatePersona (_id:string, updatePersonaDto: UpdatePersonaDto):Promise<IPersonaDocument>  {
    let persona = await this._getPersonaById(_id);
    if (persona === null) {
      throw new BadRequestException ('Persona no encontrada')
    }
    if( await this._isEmailUsedForOther(updatePersonaDto.email, _id)) {
      throw new BadRequestException ('Email ya utilizado')
    }

    if( await this._isRutUsedForOther(updatePersonaDto.rut, _id)) {
      throw new BadRequestException ('Rut ya utilizado')
    }

    if( await this._isRutChileUsedForOther(updatePersonaDto.rut_chile, _id)) {
      throw new BadRequestException ('Rut Chile ya utilizado')
    }

    await this.personaModel.updateOne({_id: _id}, updatePersonaDto);
    return this._getPersonaById(_id)

  }

  async getAll():Promise<IPersonaDocument[]> {
    return this.personaModel.find()
  }

  async get(id:string):Promise<IPersonaDocument> {
    return this._getPersonaById(id);
  }

  async delete (id:string):Promise<IPersonaDocument>{
    let persona = await this._getPersonaById(id);
    if (persona === null) {
      throw new BadRequestException ('Persona no encontrada')
    }
    return persona.remove();
  }


  async queryFilterBy(queryPersonaDto:QueryPersonaDto):Promise<IPersonaDocument[]> {
    let query = queryPersonaDto;
    if(queryPersonaDto.direcciones && queryPersonaDto.direcciones.length >0) {
      query = Object.assign(query, { direcciones: {$regex: `.*${queryPersonaDto.direcciones}.*`}})
    }
    return this.personaModel.find( query)
  }
}



