import { Controller, Post,Body, Put, UsePipes, Param, Get, Delete, Query } from '@nestjs/common';
import CreatePersonaDto from './dto/create.persona.dto';
import { JoiValidationPipe } from 'src/pipes/validation.pipe';
import { schemaCreatePersona } from './schemas/create.persona.schema';
import { PersonaService } from './persona.service';
import UpdatePersonaDto from './dto/update.persona.dto';
import { schemaUpdatePersona } from './schemas/update.persona.schema';
import { IPersonaDocument } from './interfaces/persona.interface';
import { schemaQueryPersona } from './schemas/query.persona.schema';
import QueryPersonaDto from './dto/query.persona.dto';

@Controller('personas')
export class PersonaController {
  constructor (private readonly personaServ: PersonaService) {

  }
  @Get('/query/filterBy')
  @UsePipes(new JoiValidationPipe(schemaQueryPersona))
  async queryFilterBy(@Query() queryPersona: QueryPersonaDto): Promise<IPersonaDocument[]> {
    console.log('query', queryPersona)
    return this.personaServ.queryFilterBy(queryPersona)
  }

  @Get() 
  async getAll ():Promise<IPersonaDocument[]> {
    return this.personaServ.getAll()
  }

  @Get('/:_id')
  async get(@Param('_id') _id: string):Promise<IPersonaDocument> {
    return this.personaServ.get(_id)
  }
  @Post()
  @UsePipes(new JoiValidationPipe(schemaCreatePersona))
  async create(@Body() createPersonaDto: CreatePersonaDto): Promise<IPersonaDocument> {
    return this.personaServ.createPersona(createPersonaDto);
  }

  @Put('/:_id')
  async update(@Param('_id') _id:string, 
    @Body(new JoiValidationPipe(schemaUpdatePersona))  updatePersonaDto: UpdatePersonaDto): Promise<IPersonaDocument> {
    return this.personaServ.updatePersona(_id, updatePersonaDto);
  }


  @Delete('/:_id')
  async delete(@Param('_id') _id:string): Promise<IPersonaDocument> {
    return this.personaServ.delete(_id)
  }




}
